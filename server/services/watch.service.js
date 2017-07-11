const cheerio = require('cheerio');
const request = require('../data/index');

module.exports = {
    getWatchlist(user, list) {
        const URL = determineLink(user, list);
        const AFTERLINK = '.webp';

        return getSuggestions().then((suggestions) => {
            return request.getHtml(URL).then((html) => {
                const $ = cheerio.load(html);

                return $('.grid-item').map(function () {
                    const item = $(this);
                    return {
                        title: item.find('a.titles-link div.titles h3').text(),
                        poster: item.find('a div.poster img.real').attr('data-original') + AFTERLINK
                    };
                }).get().concat(suggestions);
            }).catch((err) => {
                console.log(err);
            });
        });
    }
};

function getSuggestions () {
    const URL = 'https://draait-er-nog-iets.firebaseio.com/suggestions.json';

    return request.getJson(URL).then((suggestionsObj) => {
        return Object.keys(suggestionsObj).map((key) => {
            const obj = suggestionsObj[key];
            return { title: obj.title, poster: obj.poster };
        });
    }).catch((err) => {
        console.log(err);
    });
}

function determineLink (user, list) {
    const URL = 'https://trakt.tv/users';

    if (list === 'watchlist') {
        return URL + '/' + user + '/' + list;
    } else {
        return URL + '/' + user + '/lists/' + list;
    }
}