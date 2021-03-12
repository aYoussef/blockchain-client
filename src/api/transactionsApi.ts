import {
  BtcNonCustodial,
  CustodialTransaction,
  EthNonCustodial
} from '../types';
import { backendGet } from './helper';

export const getBtcNonCustodialTransactions = (): Promise<
  BtcNonCustodial[]
> => {
  return backendGet('/btc-txs');
};

export const getEthNonCustodialTransactions = (): Promise<
  EthNonCustodial[]
> => {
  return backendGet('/eth-txs');
};

export const getCustodialTransactions = (): Promise<CustodialTransaction[]> => {
  return backendGet('/custodial-txs');
};
