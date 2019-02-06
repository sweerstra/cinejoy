exports.sortByDate = (arr, propFn) => {
  return arr.sort((a, b) => {
    return new Date(propFn(a)) - new Date(propFn(b));
  });
};
