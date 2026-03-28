require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger-output.json');

const connectDB = require('./config/db');
const errorHandler = require('./middleware/errorHandler');
const moviesRoutes = require('./routes/movies');
const reviewsRoutes = require('./routes/reviews');

const app = express();

connectDB();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use('/movies', moviesRoutes);
app.use('/reviews', reviewsRoutes);

app.get('/', (req, res) => {
  res.status(200).json({ message: 'API is running' });
});

app.use(errorHandler);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});