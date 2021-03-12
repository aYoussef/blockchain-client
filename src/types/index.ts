export interface BtcNonCustodial {
  amount: number;
  blockHeight: number;
  coin: string;
  description: string;
  doubleSpend: boolean;
  from: string;
  fromWatchOnly: boolean;
  hash: string;
  insertedAt: string;
  state: string;
  to: string;
  toAddress: string;
  toWatchOnly: boolean;
  txFee: number;
  type: string;
}

export interface EthNonCustodial {
  amount: BigInt;
  blockHeight: string;
  data: string;
  description: string;
  erc20: boolean;
  from: string;
  hash: string;
  insertedAt: string;
  state: string;
  to: string;
  exFee: string;
  type: string;
}

export interface CustodialTransaction {
  createdAt: string;
  id: string;
  pair: string;
  state: string;
  fiatValue: string;
  fiatCurrency: string;
  type: string;
  version: string;
}

export interface Price {
  btc: number;
  eth: number;
}
