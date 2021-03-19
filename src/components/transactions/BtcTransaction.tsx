import React from 'react';
import { IBtcNonCustodial, ITransactionDetails } from '../../types';
import { convertBtcToFiat, formatBtc, getTransactionIcon } from './helper';
import { TransactionCard } from './TransactionCard';

interface Props {
  transaction: IBtcNonCustodial;
  price: number;
  onClick: (transactionDetails: ITransactionDetails) => void;
}

export const BtcTransaction: React.FunctionComponent<Props> = (props) => {
  const { transaction, price, onClick } = props;
  const transactionDetails: ITransactionDetails = {
    title: `${transaction.coin} ${transaction.type}`,
    amount: formatBtc(transaction.amount).toFixed(8),
    fiatAmount: convertBtcToFiat(transaction.amount, price),
    date: new Date(transaction.insertedAt * 1000),
    icon: getTransactionIcon(transaction.type),
    status: transaction.state,
    from: transaction.from,
    to: transaction.to
  };
  return (
    <TransactionCard
      onClick={() => onClick(transactionDetails)}
      title={transactionDetails.title}
      to={`To: ${transactionDetails.to}`}
      from={`From: ${transactionDetails.from}`}
      amount={transactionDetails.amount}
      date={transactionDetails.date}
      state={transactionDetails.status}
      fiatValue={transactionDetails.fiatAmount}
      icon={transactionDetails.icon}
    />
  );
};
