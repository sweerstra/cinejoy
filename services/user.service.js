const request = require('../data/index');

module.exports = {
    isValidUser(username) {
        const url = 'https://trakt.tv/users/' + username;
        return request.getHtml(url)
            .then(html => html.indexOf('<h1>404</h1>') === -1);
    }
};
