const express = require('express');
const router = express.Router();

const reviewController = require('../controllers/reviewController');
const validation = require('../middleware/validate');
const { isAuthenticated } = require('../middleware/auth');

router.get(
  '/',
  /* #swagger.tags = ['Reviews'] */
  reviewController.getAllReviews
);

router.get(
  '/movie/:movieId',
  /* #swagger.tags = ['Reviews'] */
  reviewController.getReviewsByMovie
);

router.get(
  '/:id',
  /* #swagger.tags = ['Reviews'] */
  reviewController.getReviewById
);

router.post(
  '/movie/:movieId',
  isAuthenticated,
  /* #swagger.tags = ['Reviews'] #swagger.summary = 'Create a review for a movie' #swagger.security = [{ "sessionAuth": [] }] */
  validation.saveReview,
  reviewController.createReviewForMovie
);

router.put(
  '/:id',
  isAuthenticated,
  /* #swagger.tags = ['Reviews'] #swagger.summary = 'Update a review' #swagger.security = [{ "sessionAuth": [] }] */
  validation.saveReview,
  reviewController.updateReview
);

router.delete(
  '/:id',
  isAuthenticated,
  /* #swagger.tags = ['Reviews'] #swagger.summary = 'Delete a review' #swagger.security = [{ "sessionAuth": [] }] */
  reviewController.deleteReview
);

module.exports = router;