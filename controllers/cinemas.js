const { getBrandNames, getPredicateResultsForBrands } = require('../services/factory');

exports.getCinemas = async (req, res) => {
  let { brands } = req.params;
  brands = brands ? brands.split(',') : getBrandNames();

  const cinemaPromises = getPredicateResultsForBrands(brands, service => service.getCinemas());

  const cinemaArrays = await Promise.all(cinemaPromises);
  const cinemas = [].concat(...cinemaArrays);

  res.json(cinemas);
};

exports.getAvailableCinemasForMovie = async (req, res) => {
  const { url } = req.query;

  if (!url) {
    return res.status(422).send({ error: 'No url parameter was supplied in query' });
  }

  const cinemas = await req.brandService.getAvailableCinemasForMovie(url);

  res.json(cinemas);
};
