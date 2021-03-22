/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  IBtcNonCustodial,
  ICustodialTransaction,
  IEthNonCustodial,
  IFilters,
  ITransaction
} from '../../types';

const WEI_PER_ETH = 1000000000000000000;
const SAT_PER_BTC = 100000000;

/**
 * Checks whether the ITransaction is instance of IEthNonCustodial
 * @param data: any
 * @returns boolean
 */
export const instanceOfEth = (data: any): data is IEthNonCustodial => {
  return 'erc20' in data;
};

/**
 * Checks whether the ITransaction is instance of IBtcNonCustodial
 * @param data: any
 * @returns boolean
 */
export const instanceOfBtc = (data: any): data is IBtcNonCustodial => {
  return 'coin' in data;
};

/**
 * Checks whether the ITransaction is instance of ICustodialTransaction
 * @param data: any
 * @returns boolean
 */
export const instanceOfCustodial = (
  data: any
): data is ICustodialTransaction => {
  return 'createdAt' in data;
};

/**
 * Orders 2 transactions according to the passed in sorting function.
 * the caller has to decide whether the passed in sort function should
 * return date1 - date2 or date2 - date1
 * @param firstTransaction: ITransaction
 * @param secondTransaction: ITransaction
 * @param sortCallback: (firstDate: number, secondDate: number) => number
 * @returns number
 */
const orderTransactions = (
  a: ITransaction,
  b: ITransaction,
  sortCallback: (date1: number, date2: number) => number
): number => {
  const aDate = new Date(a.createdAt || a.insertedAt * 1000);
  const bDate = new Date(b.createdAt || b.insertedAt * 1000);
  return sortCallback(aDate.getTime(), bDate.getTime());
};

/**
 * Sorting transactions according to the passed in sort type
 * @param transactions: ITransaction[]
 * @param sortType: string
 * @returns ITransaction[]
 */
export const sortTransactions = (
  transactions: ITransaction[],
  sortType: string
): ITransaction[] => {
  switch (sortType) {
    case 'date-desc':
      return [...transactions].sort((a: ITransaction, b: ITransaction) => {
        return orderTransactions(a, b, (date1, date2) => date2 - date1);
      });
    case 'date-asc':
      return [...transactions].sort((a: ITransaction, b: ITransaction) => {
        return orderTransactions(a, b, (date1, date2) => date1 - date2);
      });
    default:
      return transactions;
  }
};

/**
 * Converts wei amount to eth
 * @param amount: number
 * @returns number
 */
export const formatEth = (amount: number): number => {
  return amount / WEI_PER_ETH;
};

/**
 * Converts sat amount to btc
 * @param amount: number
 * @returns number
 */
export const formatBtc = (amount: number): number => {
  return amount / SAT_PER_BTC;
};

/**
 * Returns the fiat value of a passed in BTC amount
 * @param amount: number
 * @param price: number
 * @returns: string
 */
export const convertBtcToFiat = (amount: number, price: number): string => {
  return `$${(formatBtc(amount) * price).toFixed(2)}`;
};

/**
 * Returns the fiat value of a passed in ETH amount
 * @param amount: number
 * @param price: number
 * @returns string
 */
export const convertEthToFiat = (amount: number, price: number): string => {
  return `$${(formatEth(amount) * price).toFixed(2)}`;
};

export const getTransactionIcon = (type: string) => {
  return type === 'received' ? 'circle-arrow-down' : 'circle-arrow-up';
};

/**
 * Checked whether a custodial transaction is of type ETH or BTC
 * @param transaction: ITransaction
 * @param currency: string
 * @returns boolean
 */
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

/**
 * Filters transactions by status and currency
 * @param transactions: ITransaction[]
 * @param filters: IFilters
 * @returns ITransaction[]
 */
export const filterTransactions = (
  transactions: ITransaction[],
  filters: IFilters
): ITransaction[] => {
  let states: string[];
  switch (filters.status) {
    // The done status should include both finished and confirmed transactions
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
    // Combine both filters together, currency and status
    return (
      states.includes(transaction.state.toLowerCase()) &&
      filterCurrency(transaction, filters.currency)
    );
  });
};
