const { getBrandNames, getBrandService } = require('../services/factory');

exports.passAlongBrandService = (req, res, next) => {
  const { brand } = req.params;

  if (brand === undefined) {
    next();
  }

  const service = getBrandService(brand);

  if (service === null) {
    return res.status(422).send({ error: `Service for ${brand} does not exist` });
  }

  req.brandService = service;
  next();
};

exports.validateBrands = (req, res, next) => {
  const brands = req.params.brands.split(/\s*,\s*/);
  const validBrands = getBrandNames();

  const invalidBrands = brands.filter(brand => !validBrands.includes(brand));

  if (invalidBrands.length > 0) {
    return res.status(422).send({
      error: `One or more invalid brands were supplied: [${invalidBrands.join(', ')}], available: [${getBrandNames().join(', ')}]`
    });
  }

  req.brands = brands;
  next();
};
