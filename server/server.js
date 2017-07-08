const express = require('express');
const app = express();
const fs = require('fs');
const path = require('path');

const scheduleService = require('./services/schedule.service');
const matchingService = require('./services/matching.service');

const port = process.env.PORT || process.env.OPENSHIFT_NODEJS_PORT || 8080;
const ip = process.env.IP || process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1';

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    next();
});

app.use(express.static(path.join(__dirname, 'views')));

app.get('/', (req, res) => {
    res.render('index.html');
});

app.get('/titles', (req, res) => {
    matchingService.getMatchingTitles().then((titles) => {
        res.send(titles);
    });
});

app.get('/schedule', (req, res) => {
    const url = req.query.link;
    const minTime = +req.query.time;

    scheduleService.getCorrectTimeLink(url, minTime).then((link) => {
        res.send(link);
    });
});

app.get('/schedules', (req, res) => {
    const url = req.query.link;

    scheduleService.getSchedule(url).then((data) => {
        res.send(data);
    });
});

app.listen(port, ip);
console.log('Server running on http://%s:%s', ip, port);

module.exports = app;
