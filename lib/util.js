/* @flow */

/**
 * Return milliseconds since epoch given a date string in the form YYYY-MM-DD in local timezone
 */
export function getTimestamp(dateStr: string) {
  const [year, month, day] = dateStr.split("-").map(x => parseInt(x, 10));
  const dateObj = new Date(year, month - 1, day);
  return dateObj.getTime();
}

/**
 * Return a date string in the form YYYY/M/D in local timezone given a timestamp
 */
export function formatDate(timestamp: number) {
  const dateObj = new Date(timestamp);
  const year = dateObj.getFullYear();
  const month = dateObj.getMonth();
  const day = dateObj.getDate();
  return `${year}/${month + 1}/${day}`;
}

/**
 * Return a date string in the form YYYY-MM-DD in local timezone given a timestamp
 */
export function formatInputDate(timestamp: number) {
  const dateObj = new Date(timestamp);
  const year = dateObj.getFullYear();
  const month = dateObj.getMonth() + 1;
  const day = dateObj.getDate();
  const monthZeroPad = month < 10 ? "0" : "";
  const dayZeroPad = day < 10 ? "0" : "";
  return `${year}-${monthZeroPad}${month}-${dayZeroPad}${day}`;
}
