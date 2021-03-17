import React from 'react';
import { ICustodialTransaction } from '../../types';
import { TransactionCard } from './TransactionCard';

interface Props {
  transaction: ICustodialTransaction;
}

export const CustodialTransaction: React.FunctionComponent<Props> = (props) => {
  const { transaction } = props;

  const getPastTense = (verb: string) => {
    return verb === 'sell' ? 'Sold' : 'Bought';
  };

  return (
    <TransactionCard
      title={`${getPastTense(transaction.type)} ${
        transaction.pair.split('-')[0]
      }`}
      details={`Fiat: ${transaction.pair.split('-')[1]}`}
      date={new Date(transaction.createdAt)}
      state={transaction.state}
      fiatValue={`$${Number(transaction.fiatValue).toFixed(2)}`}
      icon="changes"
    />
  );
};
