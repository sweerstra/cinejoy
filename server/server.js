var express = require('express');
var app = express();
var fs = require('fs');
var path = require('path');

var scheduleService = require('./services/schedule.service');
var matchingService = require('./services/matching.service');

const port = process.env.PORT || process.env.OPENSHIFT_NODEJS_PORT || 8080;
const ip = process.env.IP || process.env.OPENSHIFT_NODEJS_IP || '0.0.0.0';

app.use(express.static(path.join(__dirname, 'views')));

app.get('/', (req, res) => {
    res.render('index.html');
});

app.get('/titles', (req, res) => {
    matchingService.getMatchingTitles().then((titles) => {
        console.log(titles);
        res.send(titles);
    });
});

app.get('/schedule', (req, res) => {
    // http://localhost:8080/schedule?link=https://www.euroscoop.nl/tilburg/films/alien-covenant-601578&time=1900
    const url = req.query.link;
    const minTime = +req.query.time;

    scheduleService.getCorrectTimeLink(url, minTime).then((link) => {
        res.send(link);
    });
});

app.listen(port, ip);
console.log('Server running on http://%s:%s', ip, port);

module.exports = app;
