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
    },

    postJson(url, data) {
        return fetch(url,
        {   
            method: 'POST',
            body: JSON.stringify(data)
        }).then((res) => {
            return res.json();
        });
    }
};
