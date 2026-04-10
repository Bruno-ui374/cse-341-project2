const express = require('express');
const router = express.Router();

const movieController = require('../controllers/movieController');
const validation = require('../middleware/validate');
const { isAuthenticated } = require('../middleware/auth');

router.get(
  '/',
  /* #swagger.tags = ['Movies'] */
  movieController.getAllMovies
);

router.get(
  '/:id',
  /* #swagger.tags = ['Movies'] #swagger.parameters['id'] = { in: 'path', description: 'Movie id', required: true, type: 'string' } */
  movieController.getMovieById
);

router.post(
  '/',
  isAuthenticated,
  /* #swagger.tags = ['Movies'] #swagger.summary = 'Create a movie' #swagger.security = [{ "sessionAuth": [] }] */
  validation.saveMovie,
  movieController.createMovie
);

router.put(
  '/:id',
  isAuthenticated,
  /* #swagger.tags = ['Movies'] #swagger.summary = 'Update a movie' #swagger.security = [{ "sessionAuth": [] }] */
  validation.saveMovie,
  movieController.updateMovie
);

router.delete(
  '/:id',
  isAuthenticated,
  /* #swagger.tags = ['Movies'] #swagger.summary = 'Delete a movie' #swagger.security = [{ "sessionAuth": [] }] */
  movieController.deleteMovie
);

module.exports = router;