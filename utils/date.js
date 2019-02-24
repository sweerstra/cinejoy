const { WeekDays, MonthNames } = require('../constants');

exports.dateToNumericDateString = date => {
  if (!isValidDate(date)) {
    return null;
  }

  return date.toLocaleDateString('nl-NL', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  });
};

exports.dateToLongDateString = date => {
  if (!isValidDate(date)) {
    return null;
  }

  const weekday = WeekDays[date.getDay()];
  const day = date.getDate();
  const month = MonthNames[date.getMonth() + 1];

  return `${weekday} ${day} ${month}`;
};

exports.dateToTimeString = date => {
  if (!isValidDate(date)) {
    return null;
  }

  return date.toLocaleTimeString('nl-NL', {
    hour: '2-digit',
    minute: '2-digit'
  });
};

function isValidDate(date) {
  return date instanceof Date && !isNaN(date);
}

function formatDateDigit(digit) {
  digit = parseFloat(digit);
  return digit >= 10 ? digit.toString() : '0' + digit;
}
