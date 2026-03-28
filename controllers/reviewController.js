const mongoose = require('mongoose');
const Review = require('../models/review');
const Movie = require('../models/movie');
const validate = require('../middleware/validator');
const reviewRules = require('../validators/reviewRules');

exports.getAllReviews = async (req, res) => {
  try {
    const reviews = await Review.find();
    res.status(200).json(reviews);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getReviewsByMovie = async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.movieId)) {
      return res.status(400).json({ message: 'Invalid movie ID' });
    }

    const movieExists = await Movie.findById(req.params.movieId);
    if (!movieExists) {
      return res.status(404).json({ message: 'Movie not found' });
    }

    const reviews = await Review.find({ movieId: req.params.movieId });
    res.status(200).json(reviews);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getReviewById = async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ message: 'Invalid review ID' });
    }

    const review = await Review.findById(req.params.id);

    if (!review) {
      return res.status(404).json({ message: 'Review not found' });
    }

    res.status(200).json(review);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.createReviewForMovie = async (req, res) => {
  try {
    const payload = { ...req.body, movieId: req.params.movieId };
    const validation = validate(payload, reviewRules);

    if (validation.fails()) {
      return res.status(400).json({ errors: validation.errors.all() });
    }

    if (!mongoose.Types.ObjectId.isValid(req.params.movieId)) {
      return res.status(400).json({ message: 'Invalid movie ID' });
    }

    const movieExists = await Movie.findById(req.params.movieId);
    if (!movieExists) {
      return res.status(404).json({ message: 'Movie not found' });
    }

    const review = await Review.create({
      movieId: req.params.movieId,
      reviewer: req.body.reviewer,
      comment: req.body.comment,
      score: req.body.score
    });

    res.status(201).json(review);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateReview = async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ message: 'Invalid review ID' });
    }

    const validation = validate(req.body, reviewRules);

    if (validation.fails()) {
      return res.status(400).json({ errors: validation.errors.all() });
    }

    if (!mongoose.Types.ObjectId.isValid(req.body.movieId)) {
      return res.status(400).json({ message: 'Invalid movie ID' });
    }

    const movieExists = await Movie.findById(req.body.movieId);
    if (!movieExists) {
      return res.status(404).json({ message: 'Movie not found' });
    }

    const review = await Review.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });

    if (!review) {
      return res.status(404).json({ message: 'Review not found' });
    }

    res.status(200).json(review);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.deleteReview = async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ message: 'Invalid review ID' });
    }

    const review = await Review.findByIdAndDelete(req.params.id);

    if (!review) {
      return res.status(404).json({ message: 'Review not found' });
    }

    res.status(200).json({ message: 'Review deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};