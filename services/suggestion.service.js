const cheerio = require('cheerio');
const request = require('../data/index.js');
const Urlparser = require('../utils/urlparser.js');

module.exports = {
    getValidatedPoster(poster) {
        const parser = new Urlparser(poster);

        if (parser.isTrakt() && !parser.hasDotExtension()) {
              return request.getHtml(poster)
              	.then((html) => {
			        const $ = cheerio.load(html);
			        return $('#info-wrapper .poster img.real').attr('data-original') + '.webp';
		    	});
        } 

        return poster;
    },

    addSuggestion(suggestion) {
    	return request.postJson('https://draait-er-nog-iets.firebaseio.com/suggestions.json', suggestion);
    }
};
