const cheerio = require('cheerio');
const request = require('../data/index');

module.exports = {
    getShows(username) {
        return fetchShows(username);
    },

    getSeasons(showUrl) {
        return fetchSeasons(showUrl);
    }
};

function fetchShows(username) {
    const url = 'https://trakt.tv/users/' + username + '/history/shows/added';
    const PRELINK = 'https://trakt.tv';
    const AFTERLINK = '.webp';

    return request.getHtml(url).then((html) => {
        const $ = cheerio.load(html);

        return $('.grid-item').map(function () {
            const item = $(this);
            const link = item.find('a').attr('href');

            return {
                title: item.find('a.titles-link div.titles h3').text(),
                poster: item.find('a div.poster img.real').attr('data-original') + AFTERLINK,
                link: PRELINK + link
            };
        }).get();
    }).catch((err) => {
        console.log(err);
    });
}

function fetchSeasons(url) {
    const AFTERLINK = '.webp';

    return request.getHtml(url).then((html) => {
        const $ = cheerio.load(html);

        return $('.season-posters .grid-item').map(function () {
            const item = $(this);

            return {
                title: item.find('a.titles-link div.titles h3').text(),
                poster: item.find('a div.poster img.real').attr('data-original') + AFTERLINK
            };
        }).get();
    }).catch((err) => {
        console.log(err);
    });
}
