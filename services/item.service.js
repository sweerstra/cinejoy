const cheerio = require('cheerio');
const request = require('../data/index.js');

module.exports = {
    getItems() {
        return getCurrentItems().then((current) => {
            return getExpectingItems().then((expecting) => {
                return {
                    current: current,
                    expecting: expecting
                };
            })
        });
    }
};

function getCurrentItems() {
    const URL = 'https://www.euroscoop.nl/tilburg/films/';

    return request.getHtml(URL).then((html) => {
        const PRELINK = "https://www.euroscoop.nl";
        const $ = cheerio.load(html);

        return $('.instafilta-target').map(function () {
            var item = $(this);
            return {
                title: item.find('.titleMobile').text(),
                link: PRELINK + item.find('a').attr('href')
            };
        }).get();
    }).catch((err) => {
        console.log(err);
    });
}

function getExpectingItems() {
    const URL = 'https://www.euroscoop.nl/tilburg/films/wordt-verwacht/';
    const PRELINK = 'https://www.euroscoop.nl';

    return request.getHtml(URL).then((html) => {
        const $ = cheerio.load(html);

        return $('.instafilta-target').map(function () {
            var item = $(this);
            return {
                title: item.find('.titleMobile').text(),
                release: item.find('.desc .expected').text(),
                link: PRELINK + item.find('a').attr('href')
            }
        }).get();
    }).catch((err) => {
        console.log(err);
    });
}