const passport = require('passport');
const GitHubStrategy = require('passport-github2').Strategy;
const User = require('../models/user');

const appBaseUrl = (
  process.env.APP_URL ||
  process.env.BASE_URL ||
  `http://localhost:${process.env.PORT || 3000}`
).replace(/\/+$/, '');

const githubCallbackUrl =
  process.env.GITHUB_CALLBACK_URL || `${appBaseUrl}/auth/github/callback`;

passport.use(
  new GitHubStrategy(
    {
      clientID: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      callbackURL: githubCallbackUrl
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        const user = await User.findOneAndUpdate(
          { githubId: profile.id },
          {
            githubId: profile.id,
            username: profile.username,
            displayName: profile.displayName || profile.username,
            email: profile.emails?.[0]?.value || ''
          },
          { upsert: true, new: true }
        );

        return done(null, user);
      } catch (err) {
        return done(err, null);
      }
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user._id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (err) {
    done(err, null);
  }
});

module.exports = passport;