import moment from 'moment';

/**
 *  Reset the seconds part for the passed in date
 * @param date
 * @returns date
 */
export const disregardSeconds = (date: Date): Date => {
  return moment(date).seconds(0).milliseconds(0).toDate();
};

/**
 * Floors the date's minutes to the last quarter hour
 * Examples:
 * in: 08:33 / out: 08:30
 * in: 14:55 / out: 14:45
 * @param date
 * @returns date
 */
export const floorMinutesToQuarterHour = (date: Date): Date => {
  const dateWithoutSeconds = moment(disregardSeconds(date));
  const remainder = dateWithoutSeconds.minutes() % 15;
  return dateWithoutSeconds.subtract(remainder, 'minutes').toDate();
};

/**
 * Converts the passed in date to the backend format which
 * neglects the milliseconds part
 * @param date
 * @returns number
 */
export const convertToBackendTime = (date: Date): number => {
  return Math.trunc(date.getTime() / 1000);
};
