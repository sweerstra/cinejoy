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
