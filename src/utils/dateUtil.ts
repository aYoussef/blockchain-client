import moment from 'moment';

export const disregardSeconds = (date: Date): Date => {
  return moment(date).seconds(0).milliseconds(0).toDate();
};

export const floorMinutesToQuarterHour = (date: Date): Date => {
  const dateWithoutSeconds = moment(disregardSeconds(date));
  const remainder = dateWithoutSeconds.minutes() % 15;
  return dateWithoutSeconds.subtract(remainder, 'minutes').toDate();
};

export const convertToBackendTime = (date: Date): number => {
  return Math.trunc(date.getTime() / 1000);
};

export const convertFromBackendTime = (date: Date): number => {
  return Math.trunc(date.getTime() / 1000);
};
