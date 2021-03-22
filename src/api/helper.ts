/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import camelcaseKeys from 'camelcase-keys';

// Builds the backend url
const constructBackendUrl = (endpoint: string, baseUrl?: string): string => {
  if (baseUrl) {
    return `${baseUrl}${endpoint}`;
  }
  return `${process.env.REACT_APP_BASE_URL}${endpoint}`;
};

// Constructs the backend calls, will switch the backend response
// from snake case to camel case
export const backendGet = async (endpoint: string, baseUrl?: string) => {
  const response = await fetch(constructBackendUrl(endpoint, baseUrl));
  const data = await response.json();
  return camelcaseKeys(data);
};
