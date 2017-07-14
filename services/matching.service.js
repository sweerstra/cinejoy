const itemService = require('./item.service');
const watchService = require('./watch.service');
const sortByDateString = require('../utils/sortByDateString');

module.exports = {
    getMatchingTitles(url) {
        return itemService.getItems().then((items) => {
            const current = items.current;
            const expecting = items.expecting;

            return watchService.getList(url).then((watchlist) => {
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

function matchWithAvailable (items, toPopulate, watchlistItem) {
    const watchlistItemTitle = watchlistItem.title.toLowerCase();

    items.forEach((result) => {
        if (result.title.toLowerCase().indexOf(watchlistItemTitle) !== -1) {
            toPopulate.push({
                title: result.title,
                poster: watchlistItem.poster,
                release: result.release,
                link: result.link
            });
        }
    });
}
