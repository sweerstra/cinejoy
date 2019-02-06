const { getBrandService } = require('../services/factory');

exports.withBrandService = (req, res, next) => {
  const { brand } = req.params;

  if (brand === undefined) {
    next();
  }

  const service = getBrandService(brand);

  if (service === null) {
    return res.status(422).send({ error: `Service for ${brand} was not found` });
  }

  req.brandService = service;
  next();
};
