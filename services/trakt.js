const request = require('../data');

exports.getListTitles = async (username, listName) => {
  const listPath = listName === 'watchlist' ? listName : `lists/${listName}`;
  const url = `https://trakt.tv/users/${username}/${listPath}`;

  try {
    const html = await request.getParsedHtml(url);

    return html('.grid-item').map(function () {
      const item = html(this);
      return item.find('.titles h3').text();
    }).get();
  } catch (e) {
    console.log(`No Trakt.tv titles found for user: ${username} with list: ${listName}`);
    return [];
  }
};
