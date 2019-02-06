const { getPredicateResultsForBrands } = require('../services/factory');

exports.getAvailableMoviesForBrands = async (req, res) => {
  const brands = req.params.brands.split(',');

  if (!brands) {
    return res.status(422).send({ error: 'No brand parameter was supplied' });
  }

  const movies = await getAllAvailableMovies(brands);

  res.json(movies);
};

exports.getMoviesForCinema = async (req, res) => {
  const { cinema } = req.params;

  if (!cinema) {
    return res.status(422).send({ error: 'No cinema parameter was supplied' });
  }

  const movies = await req.brandService.getAvailableMoviesForCinema(cinema);
  res.json(movies);
};


exports.getExpectedMoviesForBrands = async (req, res) => {
  const brands = req.params.brands.split(',');

  if (!brands) {
    return res.status(422).send({ error: 'No brand parameter was supplied' });
  }

  const movies = await getAllExpectedMovies(brands);

  res.json(movies);
};

exports.getExpectedMoviesForCinema = async (req, res) => {
  const { cinema } = req.params;

  if (!cinema) {
    return res.status(422).send({ error: 'No cinema parameter was supplied' });
  }

  const movies = await req.brandService.getExpectedMoviesForCinema(cinema);

  res.json(movies);
};

async function getAllAvailableMovies(brands) {
  const moviePromises = getPredicateResultsForBrands(brands, service => service.getAllAvailableMovies());
  const movieArraysOfBrands = await Promise.all(moviePromises);

  return mergeMoviesOnTitle([].concat(...movieArraysOfBrands));
}

async function getAllExpectedMovies(brands) {
  const moviePromises = getPredicateResultsForBrands(brands, service => service.getAllExpectedMovies());
  const movieArraysOfBrands = await Promise.all(moviePromises);

  return mergeMoviesOnTitle([].concat(...movieArraysOfBrands));
}

function mergeMoviesOnTitle(movies) {
  const result = new Map();

  movies.forEach(movie => {
    const title = handleTitle(movie.title);
    const { brand, link, image } = movie;

    if (result.has(title)) {
      const current = result.get(title);
      current.available.push({ brand, link });
      result.set(title, current);
    } else {
      const available = [{ brand, link }];
      result.set(title, { title, image, available });
    }
  });

  return Array.from(result.values());
}

function handleTitle(title) {
  const replacements = [
    ['Nederlandse Versie', 'NL'],
    ['Originele Versie', 'OV'],
    ['NL$', '(NL)'],
    ['OV$', '(OV)'],
    ['3D$', '(3D)']
  ];

  for (const [original, replacement] of replacements) {
    const regex = new RegExp(original, 'gi');
    title = title.replace(regex, replacement);
  }

  return title;
}

