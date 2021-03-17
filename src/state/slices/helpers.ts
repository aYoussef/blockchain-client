import { BackendResponse } from '../types';

export const getDefaultState = <T>(defaultValue?: T): BackendResponse<T> => {
  return {
    loading: false,
    data: defaultValue,
    error: undefined
  };
};

export const handleSuccess = <T>(data: T): BackendResponse<T> => {
  return {
    error: undefined,
    data,
    loading: false
  };
};

export const handleError = (error: string): BackendResponse<undefined> => {
  return {
    error,
    data: undefined,
    loading: false
  };
};

export const handleLoading = (): BackendResponse<undefined> => {
  return {
    error: undefined,
    data: undefined,
    loading: true
  };
};
