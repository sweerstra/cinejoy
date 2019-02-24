const urlParser = require('url');
const request = require('../data');
const { dateToNumericDateString, dateToLongDateString, dateToTimeString } = require('../utils/date');
const { sortByDate, removeDuplicates } = require('../utils/array');
const BRAND_NAME = 'kinepolis';

exports.getCinemas = async () => {
  const url = 'https://kinepolis.nl/bioscopen';

  const html = await request.getParsedHtml(url);
  const cinemasContainer = html('.view-id-theaters');

  return cinemasContainer
    .find('.views-row')
    .map(function () {
      const item = html(this);
      const link = item.find('a').attr('href');
      const id = link.split('/')[2];
      const brand = 'kinepolis';
      const title = item.find('h2').text();

      return { id, brand, title };
    }).get();
};

exports.getAvailableMoviesForCinema = async (cinema = 'breda') => {
  const url = `https://kinepolis.nl/kinepolis_movie_filter/load-content/presales/${cinema.toUpperCase()}/all`;
  const appendableMovieLink = 'https://kinepolis.nl/films/';
  const appendablePosterLink = 'https://cdn2.kinepolis.com/sites/kinepolis.nl/files/styles/kinepolis_filter_movie_poster/public/posters/';

  const json = await request.getJson(url);
  const data = json[4].list;

  return Object.values(data).map(({ title, data }) => {
    title = title.trim();
    const image = data.poster
      ? appendablePosterLink + Object.values(data.poster)[0].filename
      : null;

    return ({
      brand: BRAND_NAME,
      title,
      link: appendableMovieLink + getLinkForTitle(title),
      image,
      duration: parseFloat(data.length)
    });
  });
};

exports.getAllAvailableMovies = async () => {
  const movies = await exports.getAvailableMoviesForCinema('breda');

  return removeDuplicates(movies, 'title');
};

exports.getExpectedMoviesForCinema = async (cinema = 'breda') => {
  const url = `https://kinepolis.nl/kinepolis_movie_filter/load-content/coming/${cinema.toUpperCase()}/all`;

  const appendableMovieLink = 'https://kinepolis.nl/films/';
  const appendablePosterLink = 'https://cdn2.kinepolis.com/sites/kinepolis.nl/files/styles/kinepolis_filter_movie_poster/public/posters/';

  const json = await request.getJson(url);
  const data = json[4].list;

  const movies = Object.values(data).map(({ title, data }) => {
    title = title.trim();
    const image = data.poster
      ? appendablePosterLink + Object.values(data.poster)[0].filename
      : null;

    return ({
      brand: BRAND_NAME,
      title,
      link: appendableMovieLink + getLinkForTitle(title),
      image,
      release: dateToNumericDateString(new Date(data.release_date)),
      duration: parseFloat(data.length)
    });
  });

  return sortByDate(movies, m => m.release);
};

exports.getAllExpectedMovies = async () => {
  const movies = await exports.getExpectedMoviesForCinema('breda');

  return removeDuplicates(movies, 'title');
};

exports.getAvailableCinemasForMovie = async url => {
  const cinemas = await exports.getCinemas();

  try {
    const html = await request.getParsedHtml(url);

    const list = html('.technology-available-list').text().split(', ');

    return list.map(cinema => {
      const regex = new RegExp(cinema, 'gi');
      return cinemas.find(c => regex.test(c.title));
    });
  } catch (e) {
    console.log('No cinemas found for this movie');
    return [];
  }
};

exports.getScheduleForMovie = async (movieUrl, cinemaIds) => {
  const html = await request.getParsedHtml(movieUrl);

  const script = html('script[type="application/ld+json"]');
  const scheduleData = JSON.parse(script.html())['@graph'];

  const cinemas = scheduleData
    .filter(item => item['@type'] === 'MovieTheater')
    .map(({ ['@id']: urlId, name, url }) => ({ urlId, id: getCinemaIdFromUrl(url), name, url }));

  function findCinemaByUrlId(id) {
    return cinemas.find(cinema => cinema.urlId === id);
  }

  let screenings = scheduleData
    .filter(item => item['@type'] === 'screeningEvent')
    .map(screening => {
      const date = new Date(screening.startDate);
      const time = dateToTimeString(date);
      const day = dateToLongDateString(date);
      const cinema = findCinemaByUrlId(screening.location['@id']);
      const { url, videoFormat } = screening;
      return { day, time, cinema, url, videoFormat };
    });

  if (cinemaIds) {
    screenings = screenings.filter(screening => cinemaIds.includes(screening.cinema.id));
  }

  return Object.values(
    screenings.reduce((result, { day, time: begin, cinema, url, videoFormat: label }) => {
      const screening = { begin, cinema, url, label };
      screening.brand = BRAND_NAME;

      if (result[day]) {
        result[day].schedule.push(screening);
      } else {
        result[day] = { day, schedule: [screening] };
      }

      return result;
    }, {})
  );
};

function getCinemaIdFromUrl(uri) {
  const parsedUrl = urlParser.parse(uri);
  const paths = parsedUrl.pathname.split('/');

  return paths[2];
}


function getLinkForTitle(title) {
  return title.toLowerCase().split(/[\s:]+/).join('-');
}
