const letterboxdService = require('../services/letterboxd');
const rottenTomatoesService = require('../services/rotten-tomatoes');

exports.getLetterboxdTitlesByUsername = async (req, res) => {
  const { username } = req.params;

  const titles = await letterboxdService.getWatchlistTitles(username);

  res.json(titles);
};

exports.getRottenTomatoesScoresForMovie = async (req, res) => {
  const { movie } = req.params;

  try {
    const scores = await rottenTomatoesService.getScores(movie);
    res.json(scores);
  } catch (e) {
    res.status(400).send({
      error: e.message
    });
  }
};
