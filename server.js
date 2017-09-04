const express = require('express');
const app = express();
const fs = require('fs');
const path = require('path');
const bodyParser = require('body-parser');

const scheduleService = require('./services/schedule.service');
const matchingService = require('./services/matching.service');
const userService = require('./services/user.service');
const suggestionService = require('./services/suggestion.service');
const historyService = require('./services/history.service');

const PORT = 8080;
const IP = '0.0.0.0';

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'views')));

app.get('/', (req, res) => {
    res.render('index.html');
});

app.get('/titles', (req, res) => {
    // link that points to Trakt.tv list
    const link = req.query.link;
    // if all indexOf matching titles should be included
    const all = req.query.all;

    if (link === undefined) {
        res.status(422).send({ error: 'No \'link\' parameter supplied.' });
    }

    const username = link.split('/')[4];

    matchingService.getMatchingTitles(username, link, all)
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

app.get('/user/:name', (req, res) => {
    // is valid Trakt.tv username
    const username = req.params.name;

    if (username === undefined) {
        res.status(422).send({ error: 'No \'valid\' parameter supplied.' });
    }

    userService.isValidUser(username)
        .then(response => res.send({ response }));
});

app.get('/user/:name/lists', (req, res) => {
    const username = req.params.name;

    userService.getLists(username)
        .then(data => res.send(data));
});

app.post('/poster/:username', (req, res) => {
    const username = req.params.username;
    const suggestion = req.body;

    suggestionService.getValidatedPoster(suggestion.poster)
        .then((result) => {
            if (result) {
                suggestion.poster = result;
            }

            suggestionService.addSuggestion(username, suggestion)
                .then((added) => res.send({
                    id: added.name,
                    title: suggestion.title,
                    poster: suggestion.poster
                }));
        });
});

app.get('/history/shows/:username', (req, res) => {
    const username = req.params.username;

    if (username === undefined) {
        res.status(422).send({ error: 'No \'username\' parameter supplied.' });
    }

    historyService.getShows(username)
        .then(data => res.send(data));
});

app.get('/history/shows', (req, res) => {
    const showUrl = req.query.url;

    if (showUrl === undefined) {
        res.status(422).send({ error: 'No \'showUrl\' parameter supplied.' });
    }

    historyService.getSeasons(showUrl)
        .then(data => res.send(data));
});

app.listen(PORT, IP);
console.log('Server running on http://%s:%s', IP, PORT);

module.exports = app;
