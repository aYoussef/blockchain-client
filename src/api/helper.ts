/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import camelcaseKeys from 'camelcase-keys';

const constructBackendUrl = (endpoint: string): string => {
  return `${process.env.REACT_APP_BASE_URL}${endpoint}`;
};

export const backendGet = async (endpoint: string) => {
  const response = await fetch(constructBackendUrl(endpoint));
  const data = await response.json();
  return camelcaseKeys(data);
};
