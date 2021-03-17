import {
  IBtcNonCustodial,
  ICustodialTransaction,
  IEthNonCustodial
} from '../types';
import { backendGet } from './helper';

export const getBtcNonCustodialTransactions = (): Promise<
  IBtcNonCustodial[]
> => {
  return backendGet('/btc-txs');
};

export const getEthNonCustodialTransactions = (): Promise<
  IEthNonCustodial[]
> => {
  return backendGet('/eth-txs');
};

export const getCustodialTransactions = (): Promise<
  ICustodialTransaction[]
> => {
  return backendGet('/custodial-txs');
};
