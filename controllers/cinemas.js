const { getServiceResultsForBrands } = require('../services/factory');

exports.getCinemas = async (req, res) => {
  const { brands } = req;

  const cinemaPromises = getServiceResultsForBrands(brands, service => service.getCinemas());
  const cinemas = [].concat(...await Promise.all(cinemaPromises));

  res.json(cinemas);
};

exports.getAvailableCinemasForMovie = async (req, res) => {
  const { url } = req.query;

  if (!url) {
    return res.status(422).send({ error: 'No url query parameter was supplied' });
  }

  const cinemas = await req.brandService.getAvailableCinemasForMovie(url);

  res.json(cinemas);
};
