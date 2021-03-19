/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import camelcaseKeys from 'camelcase-keys';

const constructBackendUrl = (endpoint: string, baseUrl?: string): string => {
  if (baseUrl) {
    return `${baseUrl}${endpoint}`;
  }
  return `${process.env.REACT_APP_BASE_URL}${endpoint}`;
};

export const backendGet = async (endpoint: string, baseUrl?: string) => {
  const response = await fetch(constructBackendUrl(endpoint, baseUrl));
  const data = await response.json();
  return camelcaseKeys(data);
};
