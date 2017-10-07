const itemService = require('./item.service');
const watchService = require('./watch.service');
const sortByDateString = require('../utils/sortByDateString');

module.exports = {
    getMatchingTitles(url, username) {
        return itemService.getItems().then((items) => {
            const current = items.current;
            const expecting = items.expecting;

            return watchService.getList(url, username).then((watchlist) => {
                const currentMatches = [];
                const expectingMatches = [];

                watchlist.forEach((scrape) => {
                    matchWithAvailable(current, currentMatches, scrape);
                    matchWithAvailable(expecting, expectingMatches, scrape);
                });

                return currentMatches.concat(sortByDateString(expectingMatches));
            });
        });
    }
};

function matchWithAvailable(items, toPopulate, listItem) {
    items.forEach((result) => {
        if (result.title.toLowerCase() === listItem.title.toLowerCase()) {
            toPopulate.push({
                title: result.title,
                poster: listItem.poster,
                release: result.release,
                link: result.link
            });
        }
    });
}