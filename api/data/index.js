const axios = require('axios');
const cheerio = require('cheerio');

module.exports = {
  getParsedHtml: url => {
    return axios.get(url).then(response => cheerio.load(response.data));
  },

  getJson: url => {
    return axios.get(url).then(response => response.data);
  },
};
