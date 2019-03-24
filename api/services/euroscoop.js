const request = require('../data');
const { MonthNumbers } = require('../constants');
const BRAND_NAME = 'euroscoop';
const WEBSITE_URL = 'https://www.euroscoop.nl';

exports.getCinemas = async () => {
  const html = await request.getParsedHtml(WEBSITE_URL);
  const cinemasContainer = html('.stretch-list');

  return cinemasContainer
    .find('a')
    .map(function () {
      const item = html(this);
      const id = item.text().trim();
      const title = item.attr('title');

      return { id, brand: BRAND_NAME, title };
    }).get();
};

exports.getAvailableMoviesForCinema = async cinema => {
  const url = `https://www.euroscoop.nl/${cinema}/films`;

  try {
    const html = await request.getParsedHtml(url);

    return html('.instafilta-target').map(function () {
      const item = html(this);
      const title = item.find('h1').text();
      const link = WEBSITE_URL + item.find('a').attr('href');
      const image = WEBSITE_URL + item.find('img').attr('src');
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

    return html('.instafilta-target').map(function () {
      const item = html(this);
      const title = item.find('h1').text();
      const link = WEBSITE_URL + item.find('a').attr('href');
      const image = WEBSITE_URL + item.find('img').attr('src');
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

exports.getScheduleForMovie = async movieUrl => {
  const html = await request.getParsedHtml(movieUrl);

  let scheduleData = null;

  html('script').each(function () {
    const script = html(this);
    const data = script.html();

    if (data.includes('scheduleData')) {
      scheduleData = JSON.parse(data.replace('var scheduleData = ', '').slice(0, -1));
    }
  });

  if (!scheduleData) {
    throw new Error('No schedule data found');
  }

  return scheduleData.map(item => {
    const schedule = [];

    item.timeslots.forEach((slot, index) => {
      if (item.active[index]) {
        schedule.push({
          brand: BRAND_NAME,
          begin: slot,
          link: WEBSITE_URL + item.links[index]
        });
      }
    });

    return { day: item.name, schedule };
  });
};

function parseDateString(str) {
  const [day, monthName, year] = str.replace('Vanaf ', '').split(' ');

  return `${MonthNumbers[monthName]}-${day}-${year}`;
}
