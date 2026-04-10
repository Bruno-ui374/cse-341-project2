require('dotenv').config();

const express = require('express');
const cors = require('cors');
const session = require('express-session');
const swaggerUi = require('swagger-ui-express');

const swaggerDocument = require('./swagger-output.json');
const connectDB = require('./config/db');
const passport = require('./config/passport');
const errorHandler = require('./middleware/errorHandler');
const { isAuthenticated } = require('./middleware/auth');

const moviesRoutes = require('./routes/movies');
const reviewsRoutes = require('./routes/reviews');
const authRoutes = require('./routes/auth');

const app = express();
const PORT = process.env.PORT || 3000;
const isProduction = process.env.NODE_ENV === 'production';

if (isProduction) {
  app.set('trust proxy', 1);
}

app.use(
  cors({
    origin: true,
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS']
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  session({
    secret: process.env.SESSION_SECRET || 'dev_secret_change_me',
    resave: false,
    saveUninitialized: false,
    proxy: isProduction,
    cookie: {
      secure: isProduction,
      httpOnly: true,
      sameSite: 'lax'
    }
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use('/', (req, res, next) => {
  if (req.path !== '/') return next();
  const loggedIn = req.isAuthenticated && req.isAuthenticated();

  res.send(`
    <!doctype html>
    <html lang="en">
      <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>Movie API</title>
        <style>
          body {
            margin: 40px auto;
            padding: 0 16px;
            max-width: 760px;
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
            line-height: 1.5;
            color: #111;
            background: #fff;
          }
          h1 {
            margin-bottom: 8px;
            font-size: 2rem;
          }
          p {
            margin-top: 0;
          }
          a {
            color: #0366d6;
          }
          .links {
            margin-top: 16px;
            display: grid;
            gap: 8px;
          }
          .status {
            margin: 16px 0;
          }
        </style>
      </head>
      <body>
        <main>
          <h1>Movie API</h1>
          <p>Welcome to the Movie API.</p>

          <div class="status">
            Status: <strong>${loggedIn ? 'Logged in' : 'Not logged in'}</strong>
          </div>

          ${
            loggedIn
              ? `
                <p>Welcome, <strong>${req.user?.displayName || req.user?.username || 'User'}</strong>.</p>
                <div class="links">
                  <a href="/api-docs">Open API Docs</a>
                  <a href="/auth/logout">Logout</a>
                </div>
              `
              : `
                <div class="links">
                  <a href="/auth/github">Login with GitHub</a>
                </div>
              `
          }
        </main>
      </body>
    </html>
  `);
});

app.use('/auth', authRoutes);
app.use('/movies', moviesRoutes);
app.use('/reviews', reviewsRoutes);
app.use('/api-docs', isAuthenticated, swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

app.use(errorHandler);

async function startServer() {
  try {
    await connectDB();
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
      console.log(`Docs: http://localhost:${PORT}/api-docs`);
    });
  } catch (err) {
    console.error('Failed to start server:', err);
    process.exit(1);
  }
}

startServer();