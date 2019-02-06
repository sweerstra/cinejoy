const pathe = require('./services/pathe');

exports.getPatheIds = () => {
  return pathe.getCinemas().reduce((result, { id, title }) => {
    const [, ...parts] = title.split(' ');
    title = parts.map(w => w.toLowerCase()).join(' ');
    result[title] = id;
    return result;
  }, {});
};

exports.MonthNumbers = {
  januari: '01',
  februari: '02',
  maart: '03',
  april: '04',
  mei: '05',
  juni: '06',
  juli: '07',
  augustus: '08',
  september: '09',
  oktober: '10',
  november: '11',
  december: '12'
};

