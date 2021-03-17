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
