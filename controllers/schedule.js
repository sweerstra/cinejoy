exports.getScheduleForMovie = async (req, res) => {
  const { url } = req.query;
  const cinemaIds = req.params.cinemaIds.split(',');

  if (!url) {
    return res.status(422).send({ error: 'No url was supplied in query' });
  }

  const schedule = await req.brandService.getScheduleForMovieAndCinemas(url, cinemaIds);
  res.json(schedule);
};

