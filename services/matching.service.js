const itemService = require('./item.service');
const watchService = require('./watch.service');
const sortByDateString = require('../utils/sortByDateString');

module.exports = {
    getMatchingTitles(url, all) {
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

                const concatenated = currentMatches.concat(sortByDateString(expectingMatches));

                return all ? concatenated : removeDuplicateMatches(concatenated);
            });
        });
    }
};

function matchWithAvailable (items, toPopulate, listItem) {
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

function removeDuplicateMatches (matches) {
    return matches.filter((obj, pos, arr) => {
        const titles = arr.map(mapObj => mapObj.title);
        return !titles.some((someTitle) => {
            const objTitle = obj.title;
            return objTitle.indexOf(someTitle) !== -1 && objTitle.length !== someTitle.length;
        });
    });
}
