const express = require('express');
const router = express.Router();
const moviesController = require('../controllers/movies');
const scheduleController = require('../controllers/schedule');
const cinemasController = require('../controllers/cinemas');
const dataController = require('../controllers/data');
const { validateBrands, passAlongBrandService } = require('../middleware/brand');
const { catchErrors } = require('../errorHandlers');

router.get('/cinemas/:brands', validateBrands, catchErrors(cinemasController.getCinemas));
router.get('/cinemas/movie/:brand', passAlongBrandService, catchErrors(cinemasController.getAvailableCinemasForMovie));

router.get('/movies/available/:brand/:cinema', passAlongBrandService, catchErrors(moviesController.getAvailableMoviesForCinema));
router.get('/movies/available/:brands', validateBrands, catchErrors(moviesController.getAvailableMoviesForBrands));
router.get('/movies/expected/:brand/:cinema', passAlongBrandService, catchErrors(moviesController.getExpectedMoviesForCinema));
router.get('/movies/expected/:brands', validateBrands, catchErrors(moviesController.getExpectedMoviesForBrands));

router.post('/movies/:type/:brands/compare', validateBrands, catchErrors(moviesController.compareMoviesWithTitlesForBrands));

router.get('/schedule/:brand/movie/:cinemaIds', passAlongBrandService, catchErrors(scheduleController.getScheduleForMovie));

router.get('/letterboxd/:username/watchlist', catchErrors(dataController.getLetterboxdTitlesByUsername));

module.exports = router;
