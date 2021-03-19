import { IconName } from '@blueprintjs/icons';
import { BackendResponse } from '../state/types';

export interface IBtcNonCustodial {
  amount: number;
  blockHeight: string;
  coin: string;
  description: string;
  doubleSpend: boolean;
  from: string;
  fromWatchOnly: boolean;
  hash: string;
  insertedAt: number;
  state: string;
  to: string;
  toAddress: string;
  toWatchOnly: boolean;
  txFee: number;
  type: string;
}

export interface IEthNonCustodial {
  amount: number;
  blockHeight: string;
  data: string;
  description: string;
  erc20: boolean;
  from: string;
  hash: string;
  insertedAt: number;
  state: string;
  to: string;
  exFee: string;
  type: string;
}

export interface ICustodialTransaction {
  createdAt: string;
  id: string;
  pair: string;
  state: string;
  fiatValue: number;
  fiatCurrency: string;
  type: string;
  version: string;
}

export interface IPrice {
  btc: number;
  eth: number;
}

export interface ITransaction
  extends ICustodialTransaction,
    IEthNonCustodial,
    IBtcNonCustodial {}

export interface IFilters {
  currency: string;
  status: string;
}

export interface ITransactionDetails {
  title: string;
  amount?: string;
  fiatAmount: string;
  icon: IconName;
  date: Date;
  status: string;
  from?: string;
  to?: string;
  details?: string;
}

export interface IHistoricalPrices {
  [id: string]: BackendResponse<number>;
}

export interface IHistoricalPrice {
  timestamp: number;
  price: number;
  volume24h: number;
}
