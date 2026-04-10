const express = require('express');
const passport = require('../config/passport');

const router = express.Router();
const githubAuth = passport.authenticate('github', { scope: ['user:email'] });
const githubCallback = passport.authenticate('github', { failureRedirect: '/' });
const handleAuthSuccess = (req, res) => {
  res.redirect('/');
};

// Standard GitHub OAuth endpoints.
router.get('/github', githubAuth);
router.get('/github/callback', githubCallback, handleAuthSuccess);

// Backward-compatible aliases.
router.get('/login', (req, res) => {
  res.redirect('/auth/github');
});
router.get('/callback', githubCallback, handleAuthSuccess);

router.get('/logout', (req, res) => {
  req.logout((err) => {
    if (err) {
      return res.status(500).json({ error: 'Logout failed.' });
    }

    req.session.destroy((sessionErr) => {
      if (sessionErr) {
        return res.status(500).json({ error: 'Session destroy failed.' });
      }

      res.redirect('/');
    });
  });
});

router.get('/status', (req, res) => {
  if (req.isAuthenticated && req.isAuthenticated()) {
    return res.status(200).json({
      authenticated: true,
      user: req.user
    });
  }

  return res.status(401).json({
    authenticated: false
  });
});

module.exports = router;