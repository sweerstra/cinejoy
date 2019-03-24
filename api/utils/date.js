const { WeekDays, MonthNames } = require('../constants');

exports.dateToNumericDateString = date => validateDate(date, dateToNumericDateString);
exports.dateToLongDateString = date => validateDate(date, dateToLongDateString);
exports.dateToTimeString = date => validateDate(date, dateToTimeString);
exports.getWeekNumber = date => validateDate(date, getWeekNumber);
exports.getWeekDays = date => validateDate(date, getWeekDays);

function dateToNumericDateString(date) {
  const day = formatDateDigit(date.getDate());
  const month = formatDateDigit(date.getMonth() + 1);
  const year = date.getFullYear();

  return `${day}-${month}-${year}`;
}

function dateToLongDateString(date) {
  const weekday = WeekDays[date.getDay()];
  const day = date.getDate();
  const month = MonthNames[date.getMonth() + 1];

  return `${weekday} ${day} ${month}`;
}

function dateToTimeString(date) {
  const minutes = formatDateDigit(date.getMinutes());
  const seconds = formatDateDigit(date.getSeconds());

  return `${minutes}:${seconds}`;
}

function getWeekDays(date) {
  const day = date.getDay();
  const start = date.getDate() - day + (day === 0 ? -6 : 1);
  const end = date.getDate() - (day - 1) + 6;
  return [resetDate(date, start), resetDate(date, end)];
}

function getWeekNumber(date) {
  const firstDayOfYear = new Date(date.getFullYear(), 0, 1);
  const dayInMilliseconds = 86400000;
  const pastDaysOfYear = (date - firstDayOfYear) / dayInMilliseconds;
  return Math.ceil((pastDaysOfYear + firstDayOfYear.getDay() + 1) / 7);
}

function resetDate(date, newDate) {
  date.setSeconds(0);
  date.setMinutes(0);
  date.setHours(0);
  return new Date(date.setDate(newDate));
}

function validateDate(date, fn) {
  if (!isValidDate(date)) {
    return null;
  }

  return fn(date);
}

function isValidDate(date) {
  return date instanceof Date && !isNaN(date);
}

function formatDateDigit(digit) {
  digit = parseFloat(digit);
  return digit >= 10 ? digit.toString() : '0' + digit;
}
