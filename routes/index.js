const express = require('express');
const router = express.Router();
const moviesController = require('../controllers/movies');
const scheduleController = require('../controllers/schedule');
const cinemasController = require('../controllers/cinemas');
const { withBrandService } = require('../middleware/brand');
const { catchErrors } = require('../errorHandlers');

router.get('/cinemas/:brands?', catchErrors(cinemasController.getCinemas));
router.get('/cinemas/movie/:brand', withBrandService, catchErrors(cinemasController.getAvailableCinemasForMovie));

router.get('/movies/available/:brand/:cinema', withBrandService, catchErrors(moviesController.getMoviesForCinema));
router.get('/movies/available/:brands', catchErrors(moviesController.getAvailableMoviesForBrands));
router.get('/movies/expected/:brand/:cinema', withBrandService, catchErrors(moviesController.getExpectedMoviesForCinema));
router.get('/movies/expected/:brands', catchErrors(moviesController.getExpectedMoviesForBrands));

router.get('/schedule/:brand/movie/:cinemaIds', withBrandService, catchErrors(scheduleController.getScheduleForMovie));

module.exports = router;
