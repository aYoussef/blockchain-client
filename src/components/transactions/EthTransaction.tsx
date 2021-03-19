import React from 'react';
import { IEthNonCustodial, ITransactionDetails } from '../../types';
import { convertEthToFiat, formatEth, getTransactionIcon } from './helper';
import { TransactionCard } from './TransactionCard';

interface Props {
  transaction: IEthNonCustodial;
  price: number;
  onClick: (transactionDetails: ITransactionDetails) => void;
}

export const EthTransaction: React.FunctionComponent<Props> = (props) => {
  const { transaction, price, onClick } = props;
  const transactionDetails: ITransactionDetails = {
    title: `ETH ${transaction.type}`,
    amount: formatEth(transaction.amount).toFixed(8),
    fiatAmount: convertEthToFiat(transaction.amount, price),
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
