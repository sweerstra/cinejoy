var express = require('express'),
    fs = require('fs'),
    path = require('path'),
    app = express();

Object.assign = require('object-assign');
app.use(express.static(path.join(__dirname, 'views')));

var port = process.env.PORT || process.env.OPENSHIFT_NODEJS_PORT || 8080,
    ip = process.env.IP || process.env.OPENSHIFT_NODEJS_IP || '0.0.0.0';

app.get('/', function (req, res) {
    res.render('index.html');
});

app.listen(port, ip);

console.log('Server running on http://%s:%s', ip, port);

module.exports = app;
