import React from 'react';
import { IEthNonCustodial } from '../../types';
import {
  convertEthToFiat,
  formatEth,
  getTransactionIcon
} from '../../utils/transactionsUtil';
import { TransactionCard } from './TransactionCard';

interface Props {
  transaction: IEthNonCustodial;
  price: number;
}

export const EthTransaction: React.FunctionComponent<Props> = (props) => {
  const { transaction, price } = props;

  return (
    <TransactionCard
      title={`ETH ${transaction.type}`}
      to={`To: ${transaction.to}`}
      from={`From: ${transaction.from}`}
      amount={formatEth(transaction.amount).toFixed(8)}
      date={new Date(transaction.insertedAt * 1000)}
      state={transaction.state}
      fiatValue={convertEthToFiat(transaction.amount, price)}
      icon={getTransactionIcon(transaction.type)}
    />
  );
};
