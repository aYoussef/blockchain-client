/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  ICustodialTransaction,
  IEthNonCustodial,
  IFilters,
  ITransaction
} from '../../types';

const WEI_PER_ETH = 1000000000000000000;
const SAT_PER_BTC = 100000000;

export const instanceOfEth = (data: any): data is IEthNonCustodial => {
  return 'erc20' in data;
};

export const instanceOfBtc = (data: any): data is IEthNonCustodial => {
  return 'coin' in data;
};

export const instanceOfCustodial = (
  data: any
): data is ICustodialTransaction => {
  return 'createdAt' in data;
};

export const sortTransactions = (
  transactions: ITransaction[],
  sortType: string
): ITransaction[] => {
  switch (sortType) {
    case 'date-desc':
      return [...transactions].sort((a: ITransaction, b: ITransaction) => {
        const aDate = new Date(a.createdAt || a.insertedAt * 1000);
        const bDate = new Date(b.createdAt || b.insertedAt * 1000);
        return bDate.getTime() - aDate.getTime();
      });
    case 'date-asc':
      return [...transactions].sort((a: ITransaction, b: ITransaction) => {
        const aDate = new Date(a.createdAt || a.insertedAt * 1000);
        const bDate = new Date(b.createdAt || b.insertedAt * 1000);
        return aDate.getTime() - bDate.getTime();
      });
    default:
      return transactions;
  }
};

export const formatEth = (amount: number): number => {
  return amount / WEI_PER_ETH;
};

export const formatBtc = (amount: number): number => {
  return amount / SAT_PER_BTC;
};

export const convertBtcToFiat = (amount: number, price: number): string => {
  return `$${(formatBtc(amount) * price).toFixed(2)}`;
};

export const convertEthToFiat = (amount: number, price: number): string => {
  return `$${(formatEth(amount) * price).toFixed(2)}`;
};

export const getTransactionIcon = (type: string) => {
  return type === 'received' ? 'circle-arrow-down' : 'circle-arrow-up';
};

const checkCustodial = (
  transaction: ITransaction,
  currency: string
): boolean => {
  return transaction.pair?.toLowerCase().indexOf(currency) >= 0;
};

const filterCurrency = (
  transaction: ITransaction,
  currency: string
): boolean => {
  switch (currency) {
    case 'btc':
      return (
        instanceOfBtc(transaction) || checkCustodial(transaction, currency)
      );
    case 'eth':
      return (
        instanceOfEth(transaction) || checkCustodial(transaction, currency)
      );
    default:
      return true;
  }
};

export const filterTransactions = (
  transactions: ITransaction[],
  filters: IFilters
): ITransaction[] => {
  let states: string[];
  switch (filters.status) {
    case 'done':
      states = ['finished', 'confirmed'];
      break;
    case 'pending':
      states = ['pending'];
      break;
    default:
      states = ['finished', 'confirmed', 'pending'];
  }
  return transactions.filter((transaction: ITransaction) => {
    return (
      states.includes(transaction.state.toLowerCase()) &&
      filterCurrency(transaction, filters.currency)
    );
  });
};
