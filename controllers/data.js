const letterboxdService = require('../services/letterboxd');

exports.getLetterboxdTitlesByUsername = async (req, res) => {
  const { username } = req.params;

  const titles = await letterboxdService.getWatchlistTitles(username);

  res.json(titles);
};
