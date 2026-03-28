const express = require('express');
const router = express.Router();
const movieController = require('../controllers/movieController');

router.get(
  '/',
  /* #swagger.tags = ['Movies'] */
  movieController.getAllMovies
);

router.get(
  '/:id',
  /* #swagger.tags = ['Movies']
     #swagger.parameters['id'] = {
       in: 'path',
       description: 'Movie id',
       required: true,
       type: 'string'
     }
  */
  movieController.getMovieById
);

router.post(
  '/',
  /* #swagger.tags = ['Movies']
     #swagger.summary = 'Create a movie'
     #swagger.parameters['body'] = {
       in: 'body',
       required: true,
       schema: {
         title: 'Inception',
         year: 2010,
         genre: 'Sci-Fi',
         director: 'Christopher Nolan',
         duration: 148,
         rating: 9,
         description: 'A thief enters dreams to steal secrets.',
        
       }
     }
  */
  movieController.createMovie
);

router.put(
  '/:id',
  /* #swagger.tags = ['Movies']
     #swagger.summary = 'Update a movie'
     #swagger.parameters['id'] = {
       in: 'path',
       description: 'Movie id',
       required: true,
       type: 'string'
     }
     #swagger.parameters['body'] = {
       in: 'body',
       required: true,
       schema: {
         title: 'Inception',
         year: 2010,
         genre: 'Sci-Fi',
         director: 'Christopher Nolan',
         duration: 148,
         rating: 9,
         description: 'A thief enters dreams to steal secrets.',
       }
     }
  */
  movieController.updateMovie
);

router.delete(
  '/:id',
  /* #swagger.tags = ['Movies']
     #swagger.summary = 'Delete a movie'
     #swagger.parameters['id'] = {
       in: 'path',
       description: 'Movie id',
       required: true,
       type: 'string'
     }
  */
  movieController.deleteMovie
);

module.exports = router;