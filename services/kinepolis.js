const request = require('../data');
const { sortByDate } = require('../utils/date');
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

exports.getAvailableMoviesForCinema = async cinema => {
  const url = `https://kinepolis.nl/kinepolis_movie_filter/load-content/presales/${cinema}/all`;

  const appendableMovieLink = 'https://kinepolis.nl/films/';
  const appendablePosterLink = 'https://cdn2.kinepolis.com/sites/kinepolis.nl/files/styles/kinepolis_filter_movie_poster/public/posters/';

  const json = await request.getJson(url);
  const data = json[4].list;

  return Object.values(data).map(({ title, data }) => {
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

exports.getAllAvailableMovies = () => {
  return exports.getAvailableMoviesForCinema('BREDA');
};

exports.getExpectedMoviesForCinema = async cinema => {
  const url = `https://kinepolis.nl/kinepolis_movie_filter/load-content/coming/${cinema}/all`;

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
      release: data.release_date,
      duration: parseFloat(data.length)
    });
  });

  return sortByDate(movies, m => m.release);
};

exports.getAllExpectedMovies = () => {
  return exports.getExpectedMoviesForCinema('breda');
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

function getLinkForTitle(title) {
  return title.toLowerCase().split(/[\s:]+/).join('-');
}
