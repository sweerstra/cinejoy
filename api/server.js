const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const errorHandlers = require('./errorHandlers');
const routes = require('./routes');
require('dotenv').config();

const app = express();

app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/', routes);

// If that above routes didnt work, we 404 them and forward to error handler
app.use(errorHandlers.notFound);

app.set('port', process.env.PORT || 4000);

const server = app.listen(app.get('port'), () => {
  console.log(`> Server running on port ${server.address().port}`);
});
