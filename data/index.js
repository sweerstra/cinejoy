const fetch = require('node-fetch');

module.exports = {
    getHtml(url) {
        return fetch(url).then((res) => {
            return res.text();
        });
    },

    getJson(url) {
        return fetch(url).then((res) => {
            return res.json();
        });
    }
};
