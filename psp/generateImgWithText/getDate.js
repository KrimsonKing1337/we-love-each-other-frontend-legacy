function adjustForTimezone(date, tz = 3 ) {
  date.setHours(date.getHours() + tz);

  return date;
}

/**
 *
 * @param tz {string}
 */
function getDate(tz = '3') {
  const d = new Date();
  const dateUtc = new Date(d.toLocaleString('en-US', { timeZone: 'UTC' }));
  const dateObj = adjustForTimezone(dateUtc, Number(tz));

  const day = ('0' + dateObj.getDate()).slice(-2);
  const month = ('0' + (dateObj.getMonth() + 1)).slice(-2);
  const year = dateObj.getFullYear();
  const hours = ('0' + dateObj.getHours()).slice(-2);
  const minutes = ('0' + dateObj.getMinutes()).slice(-2);

  return {
    day,
    month,
    year,
    hours,
    minutes,
  }
}

module.exports = { getDate };
