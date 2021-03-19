import { IHistoricalPrice, IPrice } from '../types';
import { backendGet } from './helper';

export const fetchPrices = (): Promise<IPrice> => {
  return backendGet('/prices');
};

export const fetchHistoricalPrice = (
  timestamp: number,
  currency: string
): Promise<IHistoricalPrice> => {
  return backendGet(
    `/price/index?base=${currency}&quote=USD&time=${timestamp}`,
    'https://api.blockchain.com'
  );
};
