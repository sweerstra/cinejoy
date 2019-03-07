const { getWeekNumber } = require('./date');

/**
 * Sort array by given prop
 * @param {Array} arr to sort
 * @param {Function} predicate function to obtain property from object
 * @param {Boolean} ascending else descending
 * @returns {Array}
 */
exports.sortByDate = (arr, predicate, ascending = true) => {
  return ascending
    ? arr.sort((a, b) => {
      const propA = predicate(a);
      const propB = predicate(b);

      if (propA === null) return 1;
      if (propB === null) return -1;

      return new Date(propA) - new Date(propB);
    })
    : arr.sort((a, b) => new Date(predicate(b)) - new Date(predicate(a)));
};

exports.sortByTime = (arr, predicate, ascending = true) => {
  return ascending
    ? arr.sort((a, b) => convertTimeToNumber(predicate(a)) - convertTimeToNumber(predicate(b)))
    : arr.sort((a, b) => convertTimeToNumber(predicate(b)) - convertTimeToNumber(predicate(a)));
};

exports.groupByWeek = (arr, predicate) => {
  return arr.reduce((result, item) => {
    const date = predicate(item);
    const week = getWeekNumber(date);
    const year = date.getFullYear();
    const key = `${year}-${week}`;

    if (!result[key]) {
      result[key] = [item];
    } else {
      result[key].push(item);
    }

    return result;
  }, {});
};

function convertTimeToNumber(time) {
  const indicator = parseFloat(time.substr(0, 2));
  time = (indicator < 3 ? '3' : time.charAt(0)) + time.substr(1);
  return parseFloat(time.replace(':', ''));
}

/**
 * Remove duplicates from an array of objects in javascript
 * @param arr - Array of objects
 * @param prop - Property of each object to compare
 * @returns {Array}
 */
exports.removeDuplicates = (arr, prop) => {
  const obj = {}, len = arr.length;
  let i = 0;
  for (; i < len; i++) {
    if (!obj[arr[i][prop]]) obj[arr[i][prop]] = arr[i];
  }
  const newArr = [];
  for (const key in obj) newArr.push(obj[key]);
  return newArr;
};
