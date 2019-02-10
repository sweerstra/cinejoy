exports.stringToDefaultDateString = str => {
  const date = new Date(str);

  if (!isValidDate(date)) {
    return null;
  }

  const day = formatDateDigit(date.getDate());
  const month = formatDateDigit(date.getUTCMonth() + 1);
  const year = date.getFullYear();

  return `${month}-${day}-${year}`;
};

function isValidDate(date) {
  return date instanceof Date && !isNaN(date);
}

function formatDateDigit(digit) {
  digit = parseFloat(digit);
  return digit >= 10 ? digit.toString() : '0' + digit;
}
