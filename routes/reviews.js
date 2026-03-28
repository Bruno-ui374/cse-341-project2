const express = require('express');
const router = express.Router();
const reviewController = require('../controllers/reviewController');

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
  /* #swagger.tags = ['Reviews']
     #swagger.summary = 'Create a review for a movie'
     #swagger.parameters['body'] = {
       in: 'body',
       required: true,
       schema: {
         reviewer: 'Bruno',
         comment: 'Great movie',
         score: 9
       }
     }
  */
  reviewController.createReviewForMovie
);

router.put(
  '/:id',
  /* #swagger.tags = ['Reviews']
     #swagger.summary = 'Update a review'
  */
  reviewController.updateReview
);

router.delete(
  '/:id',
  /* #swagger.tags = ['Reviews']
     #swagger.summary = 'Delete a review'
  */
  reviewController.deleteReview
);

module.exports = router;