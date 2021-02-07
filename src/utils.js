const groupBy = (xs, key) => {
  return xs.reduce(function (rv, x) {
    (rv[x[key]] = rv[x[key]] || []).push(x);
    return rv;
  }, {});
};

const arrayGroupBy = (arr) => {
  return arr
    .map((x) => {
      let obj = {};
      obj[x] = 1;
      return obj;
    })
    .reduce((acc, x) => {
      const key = Object.keys(x)[0];
      const count = Object.values(x)[0];

      const found = acc[key] !== undefined;

      if (!found) {
        acc[key] = count;
      } else {
        acc[key] += count;
      }

      return acc;
    });
};

const humanizeDate = (dateAsStr, short = true, includeWeekday = false) => {
  let options = {};

  if (!short) {
    options = { year: 'numeric', month: 'long', day: 'numeric' };
  } else {
    options = { year: '2-digit', month: 'short', day: '2-digit' };
  }

  if (includeWeekday) options['weekday'] = short ? 'short' : 'long';

  const date = new Date(dateAsStr);
  return date.toLocaleDateString('en-US', options);
};

const arrayObjSum = (arr, key) => {
  let _sum = 0;
  for (var i = 0; i < arr.length; i++) {
    _sum += arr[i][key];
  }
  return _sum;
};

const arrayUnique = (array) => {
  var a = array.concat();
  for (var i = 0; i < a.length; ++i) {
    for (var j = i + 1; j < a.length; ++j) {
      if (a[i] === a[j]) a.splice(j--, 1);
    }
  }
  return a;
};

const arrayRange = (n) => {
  // returns a new array
  // initialized from 1 to n

  return Array.from({ length: n }, (_, i) => i + 1);
};

const arraySum = (arr) => {
  let _sum = 0;
  for (var i = 0; i < arr.length; i++) {
    _sum += arr[i];
  }
  return _sum;
};

const yyyymmddToDate = (str) => {
  let parsed = str.split('-');
  return new Date(parsed[0], parsed[1] - 1, parsed[2]);
};

const addDays = (date, days) => {
  let newDate = new Date(date.valueOf());
  newDate.setDate(date.getDate() + days);
  return newDate;
};

export { arrayObjSum, groupBy, humanizeDate, addDays, arrayUnique, arrayRange, arraySum, arrayGroupBy, yyyymmddToDate };
