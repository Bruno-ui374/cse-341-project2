const Validator = require('validatorjs');
const movieRules = require('../validators/movieRules');
const reviewRules = require('../validators/reviewRules');

const runValidation = (payload, rules, res, next) => {
  const validation = new Validator(payload, rules);

  if (validation.fails()) {
    return res.status(400).json({ errors: validation.errors.all() });
  }

  next();
};

const saveMovie = (req, res, next) => runValidation(req.body, movieRules, res, next);

const saveReview = (req, res, next) => {
  const payload = req.params.movieId
    ? { ...req.body, movieId: req.params.movieId }
    : req.body;

  return runValidation(payload, reviewRules, res, next);
};

module.exports = {
  saveMovie,
  saveReview
};
