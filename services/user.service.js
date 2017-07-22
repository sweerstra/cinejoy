const cheerio = require('cheerio');
const request = require('../data/index');

module.exports = {
    getLists(username) {
        const PRELINK = 'https://trakt.tv';
        const url = 'https://trakt.tv/users/' + username + '/lists';

        return request.getHtml(url).then((html) => {
            const $ = cheerio.load(html);

            return $('.custom-list').map(function () {
                const item = $(this);
                return {
                    title: item.find('[itemprop="name"]').text(),
                    link: PRELINK + item.find('.user-name a').attr('href')
                };
            }).get()
        }).catch((err) => {
            console.log(err);
        });
    },

    isValidUser(username) {
        const url = 'https://trakt.tv/users/' + username;
        return request.getHtml(url)
            .then(html => html.indexOf('<h1>404</h1>') === -1);
    }
};
