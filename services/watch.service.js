const cheerio = require('cheerio');
const request = require('../data/index');

module.exports = {
    getList(username, url) {
        const AFTERLINK = '.webp';

        return getSuggestions(username).then((suggestions) => {
            return request.getHtml(url).then((html) => {
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

function getSuggestions(username) {
    const URL = 'https://draait-er-nog-iets.firebaseio.com/' + username + '/suggestions.json';

    return request.getJson(URL).then((suggestionsObj) => {
        if (!suggestionsObj) return [];

        return Object.keys(suggestionsObj).map((key) => {
            const obj = suggestionsObj[key];
            return { title: obj.title, poster: obj.poster };
        });
    }).catch((err) => {
        console.log(err);
    });
}
