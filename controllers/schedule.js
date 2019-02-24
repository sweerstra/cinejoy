const { getServiceResultsForBrands } = require('../factories/brand-service');
const { sortByTime } = require('../utils/array');

exports.getScheduleForMovie = async (req, res) => {
  const { url } = req.query;
  const cinemaIds = req.params.cinemaIds ? req.params.cinemaIds.split(',') : null;

  if (!url) {
    return res.status(422).send({ error: 'No url query parameter was supplied' });
  }

  try {
    const schedule = await req.brandService.getScheduleForMovie(url, cinemaIds);
    res.json(schedule);
  } catch (e) {
    res.status(422).send({ error: e.message });
  }
};

exports.getAllSchedulesForMovie = async (req, res) => {
  const result = req.body;
  const { sort } = req.query;

  if (typeof result !== 'object' || Object.keys(result).length === 0) {
    return res.status(422).send({ error: 'No valid object body was supplied' });
  }

  try {
    const schedulePromises = getServiceResultsForBrands(
      Object.keys(result),
      (service, brand) => {
        const { url, cinemaIds } = result[brand];
        return service.getScheduleForMovie(url, cinemaIds);
      }
    );

    const schedule = mergeSchedulesOnDay([].concat(...await Promise.all(schedulePromises)), sort);
    res.json(schedule);
  } catch (e) {
    res.status(422).send({ error: e.message });
  }
};

function mergeSchedulesOnDay(schedules, sort) {
  const schedule = Object.values(
    schedules.reduce((result, item) => {
      const { day, schedule } = item;

      if (result[day]) {
        result[day].schedule.push(...schedule);
      } else {
        result[day] = { day, schedule };
      }

      return result;
    }, {})
  );

  if (sort) {
    const sortAscending = !sort.includes('desc');
    return schedule.map(({ day, schedule }) => ({
        day,
        schedule: sortByTime(schedule, timeslot => timeslot.begin, sortAscending)
      })
    );
  }

  return schedule;
}

