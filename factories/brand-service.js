const euroscoop = require('../services/euroscoop');
const kinepolis = require('../services/kinepolis');
const pathe = require('../services/pathe');

const services = {
  euroscoop,
  kinepolis,
  pathe
};

exports.getBrandNames = () => {
  return Object.keys(services);
};

exports.getBrandService = name => {
  if (!name || typeof name !== 'string') {
    return null;
  }

  name = name.toLowerCase();

  if (!Object.prototype.hasOwnProperty.call(services, name)) {
    return null;
  }

  return services[name];
};

exports.getServiceResultsForBrands = (brands, predicate) => {
  const results = [];

  brands.forEach(brand => {
    const service = exports.getBrandService(brand);

    if (service === null) {
      return console.warn(`Service for ${brand} was not found`);
    }

    results.push(predicate(service, brand));
  });

  return results;
};
