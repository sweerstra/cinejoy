const letterboxdService = require('./letterboxd');
const traktService = require('./trakt');

/**
 * uses either a {String Array} of titles or a configuration {Object}
 * to gather the titles directly or by an external source
 * @param data
 * @returns {Promise.<String[]>}
 */
exports.obtainTitlesFromConfiguration = data => {
  if (Array.isArray(data)) {
    return data;
  }

  if (typeof data !== 'object') {
    return null;
  }

  const { letterboxd, trakt } = data;

  if (letterboxd) {
    const { username } = letterboxd;

    if (!username) {
      throw missingParameterError('letterboxd', 'username');
    }

    return letterboxdService.getWatchlistTitles(username);
  }

  if (trakt) {
    const invalidParams = getInvalidParameters(trakt, ['username', 'list']);

    if (invalidParams.length > 0) {
      throw missingParameterError('trakt', ...invalidParams);
    }

    const { username, list } = trakt;
    return traktService.getListTitles(username, list);
  }

  return null;
};

function getInvalidParameters(obj, params) {
  return params.filter(param => !obj[param]);
}

function missingParameterError(name, ...parameters) {
  return new Error(`Missing or invalid configuration parameters in ${name} object: [${parameters.join(', ')}]`);
}
