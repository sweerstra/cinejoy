const urlParser = require('url');
const { MonthNumbers } = require('../constants');
const request = require('../data');
const BRAND_NAME = 'pathe';

exports.getCinemas = async () => {
  const url = 'https://www.pathe.nl/bioscoopagenda';

  const html = await request.getParsedHtml(url);
  const cinemasContainer = html('#DesktopCinemas');

  return cinemasContainer
    .find('li:not(.has-sub)')
    .map(function () {
      const item = html(this).find('input');
      const id = item.attr('value');
      const value = item.attr('data-show-value');
      const title = value.startsWith('Pathé ') ? value : `Pathé ${value}`;

      return { id, brand: BRAND_NAME, title };
    }).get();
};

exports.getAvailableMoviesForCinema = async cinema => {
  const url = `https://www.pathe.nl/bioscoop/${cinema}`;

  try {
    const html = await request.getParsedHtml(url);

    const appendableLink = 'https://www.pathe.nl';

    return html('#NowPlaying').find('.poster-carousel__item').map(function () {
      const item = html(this);
      const title = item.find('.poster__label').text();
      const link = appendableLink + item.find('a').attr('href');
      const image = item.find('img').attr('data-lazy');

      return { brand: BRAND_NAME, title, link, image };
    }).get();
  } catch (e) {
    console.log(`No movies found for Pathé ${cinema}`);
    return [];
  }
};

exports.getAllAvailableMovies = async () => {
  const url = 'https://www.pathe.nl/films/actueel';

  try {
    const html = await request.getParsedHtml(url);

    const appendableLink = 'https://www.pathe.nl';

    return html('.poster').map(function () {
      const item = html(this);
      const title = item.attr('title');
      const link = appendableLink + item.attr('href');
      const image = item.find('img').attr('src');

      return { brand: BRAND_NAME, title, link, image };
    }).get();
  } catch (e) {
    console.log('No movies found for Pathé');
    return [];
  }
};

exports.getExpectedMoviesForCinema = async cinema => {
  const url = `https://www.pathe.nl/bioscoop/${cinema}`;

  try {
    const html = await request.getParsedHtml(url);

    const appendableLink = 'https://www.pathe.nl';

    return html('#ComingSoon').find('.poster-carousel__item').map(function () {
      const item = html(this);
      const title = item.find('.poster__label').text();
      const link = appendableLink + item.find('a').attr('href');
      let image = item.find('img').attr('data-lazy');
      image = image.includes('poster_missing.png') ? appendableLink + image : image;
      const release = parseDateString(item.find('.poster__sub').text());

      return { brand: BRAND_NAME, title, link, image, release };
    }).get();
  } catch (e) {
    console.log(`No expected movies found for Pathé ${cinema}`);
    return [];
  }
};

exports.getAllExpectedMovies = async () => {
  const url = 'https://www.pathe.nl/films/verwacht';

  try {
    const html = await request.getParsedHtml(url);

    const appendableLink = 'https://www.pathe.nl';

    return html('.poster').map(function () {
      const item = html(this);
      const title = item.attr('title');
      const link = appendableLink + item.attr('href');
      const image = item.find('img').attr('src');
      const release = parseDateString(item.find('.poster__sub').text());

      return { brand: BRAND_NAME, title, link, image, release };
    }).get();
  } catch (e) {
    console.log('No movies found for Pathé');
    return [];
  }
};

exports.getAvailableCinemasForMovie = async url => {
  try {
    const html = await request.getParsedHtml(url);

    return html('[data-cinema-id]').map(function () {
      const item = html(this);
      const { cinemaId: id, cinemaName: name, cinemaCode, cityCode } = item.data();

      return { id, name, cinemaCode, cityCode };
    }).get();
  } catch (e) {
    console.log('No cinemas found for this movie');
    return [];
  }
};

exports.getScheduleForMovieAndCinemas = async (movieUrl, cinemaIds) => {
  const movieId = getMovieIdFromUrl(movieUrl);
  const cinemasQuery = cinemaIds.map(id => `cinemas=${id}&`).join('');
  const url = `https://www.pathe.nl/film/${movieId}/agenda?${cinemasQuery}projection=&special=&hideAllTicketsLink=False`;

  const html = await request.getParsedHtml(url);

  const appendableLink = 'https://www.pathe.nl';

  return html('.schedule__section').map(function () {
    const item = html(this);

    const day = item.find('.schedule__day').text();

    const schedule = item.find('.js-schedule-location').map(function () {
      const cinemaContainer = html(this);

      const cinema = {
        id: cinemaContainer.attr('data-cinema-id'),
        name: cinemaContainer.find('.schedule__location').text()
      };

      const times = cinemaContainer.find('.schedule__container a').map(function () {
        const anchor = html(this);
        const begin = anchor.find('.schedule-time__start').text();
        const end = anchor.find('.schedule-time__end').text();
        const label = anchor.find('.schedule-time__label').text().trim();
        const link = appendableLink + anchor.attr('data-href');

        return { begin, end, label, link };
      }).get();

      return { cinema, times };
    }).get();

    return { day, schedule };
  }).get();
};

function parseDateString(str) {
  if (str === '') return null;

  const [day, monthName, year] = str.split(' ');

  return `${MonthNumbers[monthName]}-${day}-${year}`;
}

function getMovieIdFromUrl(uri) {
  const parsedUrl = urlParser.parse(uri);
  const paths = parsedUrl.pathname.split('/');

  return paths[2];
}
