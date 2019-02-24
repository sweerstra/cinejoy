const { getServiceResultsForBrands } = require('../factories/brand-service');
const { obtainTitlesFromConfiguration } = require('../services/titles');
const { sortByDate } = require('../utils/array');
const { refineTitle } = require('../utils/movie');

exports.getAvailableMoviesForBrands = async (req, res) => {
  const { brands } = req;

  const movies = await getAllAvailableMovies(brands);

  res.json(movies);
};

exports.getAvailableMoviesForCinema = async (req, res) => {
  const { cinema } = req.params;

  const movies = await req.brandService.getAvailableMoviesForCinema(cinema);

  res.json(movies);
};

exports.getExpectedMoviesForBrands = async (req, res) => {
  const { brands } = req;
  const { sort } = req.query;

  const movies = await getAllExpectedMovies(brands, sort);

  res.json(movies);
};

exports.getExpectedMoviesForCinema = async (req, res) => {
  const { cinema } = req.params;

  const movies = await req.brandService.getExpectedMoviesForCinema(cinema);

  res.json(movies);
};

exports.compareMoviesWithTitlesForBrands = async (req, res) => {
  const { brands } = req;
  const { type } = req.params;
  const validTypes = ['available', 'expected'];

  try {
    const titles = await obtainTitlesFromConfiguration(req.body);

    if (!validTypes.includes(type)) {
      return res.status(422).send({
        error: `Type parameter supplied is not valid, available: [${validTypes.join(', ')}]`
      });
    }

    const movies = type === 'expected'
      ? await getAllExpectedMovies(brands, 'ascending')
      : await getAllAvailableMovies(brands);

    res.json(filterMoviesByTitles(movies, titles));
  } catch (e) {
    return res.status(422).send({ error: e.message });
  }
};

async function getAllAvailableMovies(brands) {
  const availableMoviePromises = getServiceResultsForBrands(
    brands,
    service => service.getAllAvailableMovies()
  );

  return mergeMoviesOnTitle([].concat(...await Promise.all(availableMoviePromises)));
}

async function getAllExpectedMovies(brands, sort) {
  const expectedMoviePromises = getServiceResultsForBrands(
    brands,
    service => service.getAllExpectedMovies()
  );

  const expectedMovies = mergeMoviesOnTitle([].concat(...await Promise.all(expectedMoviePromises)));

  if (sort) {
    const sortAscending = !sort.includes('desc');
    return sortByDate(expectedMovies, m => m.release, sortAscending);
  }

  return expectedMovies;
}

function mergeMoviesOnTitle(movies) {
  return Object.values(
    movies.reduce((result, movie) => {
      const title = refineTitle(movie.title);
      const key = title.toLowerCase();

      const { brand, link, image, duration, release } = movie;
      const cinema = { brand, link };

      if (result[key]) {
        result[key].cinemas.push(cinema);
      } else {
        result[key] = { title, image, duration, release, cinemas: [cinema] };
      }

      return result;
    }, {})
  );
}

function filterMoviesByTitles(movies, titles) {
  return movies.filter(movie => {
    return titles.some(title => {
      return movie.title.toLowerCase().includes(title.toLowerCase());
    });
  });
}

