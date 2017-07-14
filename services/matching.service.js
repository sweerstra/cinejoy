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

                return removeDuplicateMatches(currentMatches.concat(sortByDateString(expectingMatches)));
            });
        });
    }
};

function matchWithAvailable (items, toPopulate, listItem) {
    const listItemTitle = listItem.title.toLowerCase();

    items.forEach((result) => {
        if (result.title.toLowerCase().indexOf(listItemTitle) !== -1) {
            toPopulate.push({
                title: result.title,
                poster: listItem.poster,
                release: result.release,
                link: result.link
            });
        }
    });
}

function removeDuplicateMatches (matches) {
    return matches.filter((obj, pos, arr) => {
        const titles = arr.map(mapObj => mapObj.title);
        return !titles.some((someTitle) => {
            const objTitle = obj.title;
            return objTitle.indexOf(someTitle) !== -1 && objTitle.length !== someTitle.length;
        });
    });
}
