const request = require('../data');

exports.getWatchlistTitles = async username => {
  const url = `https://letterboxd.com/${username}/watchlist`;

  try {
    const html = await request.getParsedHtml(url);
    const list = html('.poster-list');

    return list
      .find('.poster-container img')
      .map(function () {
        return html(this).attr('alt');
      }).get();
  } catch (e) {
    console.log(`No Letterboxd titles found for user: ${username}`);
    return [];
  }
};
