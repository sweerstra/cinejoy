var express = require('express');
var fs = require('fs');
var path = require('path');
var fetch = require('node-fetch');
var app = express();

Object.assign = require('object-assign');
app.use(express.static(path.join(__dirname, 'views')));

var port = process.env.PORT || process.env.OPENSHIFT_NODEJS_PORT || 8080,
    ip = process.env.IP || process.env.OPENSHIFT_NODEJS_IP || '0.0.0.0';

app.get('/', function (req, res) {
    res.render('index.html');
});

app.get('/test', function (req, res) {
    var url = 'https://www.euroscoop.nl/tilburg/films/';
    scrapeHtml(url).then(function (html) {
        console.log(html.querySelectorAll('.instafilta-target'));
    }).catch(function (err) {
        console.log(err);
    });
});

function scrapeHtml(url) {
    return fetch(url).then(function (res) {
        var html = res.text();
        var el = document.createElement('html');
        el.innerHTML = html;
        return el;
    });
}

app.listen(port, ip);
console.log('Server running on http://%s:%s', ip, port);

module.exports = app;
