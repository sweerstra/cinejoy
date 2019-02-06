const request = require('../data');
const { MonthNumbers } = require('../constants');
const BRAND_NAME = 'euroscoop';

exports.getCinemas = async () => {
  const url = 'https://www.euroscoop.nl';

  const html = await request.getParsedHtml(url);
  const cinemasContainer = html('.stretch-list');

  return cinemasContainer
    .find('a')
    .map(function () {
      const item = html(this);
      const id = item.text().trim();
      const brand = 'euroscoop';
      const title = item.attr('title');

      return { id, brand, title };
    }).get();
};

exports.getAvailableMoviesForCinema = async cinema => {
  const url = `https://www.euroscoop.nl/${cinema}/films`;

  try {
    const html = await request.getParsedHtml(url);

    const appendableLink = 'https://www.euroscoop.nl';

    return html('.instafilta-target').map(function () {
      const item = html(this);
      const title = item.find('h1').text();
      const link = appendableLink + item.find('a').attr('href');
      const image = appendableLink + item.find('img').attr('src');
      const durationString = item.find('.duration-type i').text().split(' ')[0];
      const duration = parseFloat(durationString.split(' ')[0]);

      return { brand: BRAND_NAME, title, link, image, duration };
    }).get();
  } catch (e) {
    console.log(`No movies found for Euroscoop ${cinema}`);
    return [];
  }
};

exports.getAllAvailableMovies = () => {
  return exports.getAvailableMoviesForCinema('tilburg');
};

exports.getExpectedMoviesForCinema = async cinema => {
  const url = `https://www.euroscoop.nl/${cinema}/films/wordt-verwacht/`;

  try {
    const html = await request.getParsedHtml(url);

    const appendableLink = 'https://www.euroscoop.nl';

    return html('.instafilta-target').map(function () {
      const item = html(this);
      const title = item.find('h1').text();
      const link = appendableLink + item.find('a').attr('href');
      const image = appendableLink + item.find('img').attr('src');
      const release = parseDateString(item.find('.expected').text());

      return { brand: BRAND_NAME, title, link, image, release };
    }).get();
  } catch (e) {
    console.log('No expected movies found for Euroscoop');
    return [];
  }
};

exports.getAllExpectedMovies = () => {
  return exports.getExpectedMoviesForCinema('tilburg');
};

function parseDateString(str) {
  const [day, monthName, year] = str.replace('Vanaf ', '').split(' ');

  return `${MonthNumbers[monthName]}-${day}-${year}`;
}
