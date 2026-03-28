const express = require('express');
const router = express.Router();
const reviewController = require('../controllers/reviewController');
const validation = require('../middleware/validate');

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
  validation.saveReview,
  reviewController.createReviewForMovie
);

router.put(
  '/:id',
  /* #swagger.tags = ['Reviews']
     #swagger.summary = 'Update a review'
     #swagger.parameters['id'] = {
       in: 'path',
       description: 'Review id',
       required: true,
       type: 'string'
     }
     #swagger.parameters['body'] = {
       in: 'body',
       required: true,
       schema: {
         movieId: '660f0f6b8d9f4b3f20f9a123',
         reviewer: 'Bruno',
         comment: 'Updated review comment',
         score: 8
       }
     }
  */
  validation.saveReview,
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