import React from 'react';
import { IBtcNonCustodial } from '../../types';
import {
  convertBtcToFiat,
  formatBtc,
  getTransactionIcon
} from '../../utils/transactionsUtil';
import { TransactionCard } from './TransactionCard';

interface Props {
  transaction: IBtcNonCustodial;
  price: number;
}

export const BtcTransaction: React.FunctionComponent<Props> = (props) => {
  const { transaction, price } = props;
  return (
    <TransactionCard
      title={`${transaction.coin} ${transaction.type}`}
      to={`To: ${transaction.to}`}
      from={`From: ${transaction.from}`}
      amount={formatBtc(transaction.amount).toFixed(8)}
      date={new Date(transaction.insertedAt * 1000)}
      state={transaction.state}
      fiatValue={convertBtcToFiat(transaction.amount, price)}
      icon={getTransactionIcon(transaction.type)}
    />
  );
};
