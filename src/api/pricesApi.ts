import { IPrice } from '../types';
import { backendGet } from './helper';

export const fetchPrices = (): Promise<IPrice> => {
  return backendGet('/prices');
};
