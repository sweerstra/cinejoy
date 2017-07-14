const express = require('express');
const app = express();
const fs = require('fs');
const path = require('path');

const scheduleService = require('./services/schedule.service');
const matchingService = require('./services/matching.service');
const userService = require('./services/user.service');

const PORT = 8080;
const IP = '0.0.0.0';

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
    // link that points to Trakt.tv list
    const link = req.query.link;

    if (link === undefined) {
        res.status(422).send({ error: 'No \'link\' parameter supplied.' });
    }

    matchingService.getMatchingTitles(link)
        .then(titles => res.send(titles));
});

app.get('/schedule', (req, res) => {
    // link that points to title
    const link = req.query.link;

    if (link === undefined) {
        res.status(422).send({ error: 'No \'link\' parameter supplied.' });
    }

    scheduleService.getScheduleData(link)
        .then(data => res.send(data));
});

app.get('/users', (req, res) => {
    // is valid Trakt.tv username
    const username = req.query.valid;

    if (username === undefined) {
        res.status(422).send({ error: 'No \'valid\' parameter supplied.' });
    }

    userService.isValidUser(username)
        .then(response => res.send({ response }));
});

app.listen(PORT, IP);
console.log('Server running on http://%s:%s', IP, PORT);

module.exports = app;
