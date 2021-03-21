import React from 'react';
import { useAppSelector } from '../../state/hooks';
import { RootState } from '../../state/store';
import { ICustodialTransaction, ITransactionDetails } from '../../types';
import {
  convertToBackendTime,
  floorMinutesToQuarterHour
} from '../../utils/dateUtil';
import { TransactionCard } from './TransactionCard';

interface Props {
  transaction: ICustodialTransaction;
  onClick: (transactionDetails: ITransactionDetails) => void;
}

export const CustodialTransaction: React.FunctionComponent<Props> = (props) => {
  const { transaction, onClick } = props;
  const historicalPrices = useAppSelector(
    (state: RootState) => state.historicalPrices
  );

  const getPastTense = (verb: string) => {
    return verb === 'sell' ? 'Sold' : 'Bought';
  };

  const getTransactionAmount = () => {
    const currency = transaction.pair.includes('BTC') ? 'BTC' : 'ETH';
    const timestamp = convertToBackendTime(
      floorMinutesToQuarterHour(new Date(transaction.createdAt))
    );
    const key = `${currency}-${timestamp}`;
    const price = historicalPrices[key]?.data;
    if (!price) {
      return undefined;
    }
    return (Number(transaction.fiatValue) / price).toFixed(8);
  };

  const transactionDetails: ITransactionDetails = {
    title: `${getPastTense(transaction.type)} ${
      transaction.pair.split('-')[0]
    }`,
    fiatAmount: `$${Number(transaction.fiatValue).toFixed(2)}`,
    date: new Date(transaction.createdAt),
    icon: 'changes',
    status: transaction.state,
    details: transaction.pair,
    amount: getTransactionAmount()
  };

  return (
    <TransactionCard
      onClick={() => onClick(transactionDetails)}
      title={transactionDetails.title}
      details={`${transactionDetails.details}`}
      date={transactionDetails.date}
      state={transactionDetails.status}
      fiatValue={transactionDetails.fiatAmount}
      icon={transactionDetails.icon}
      amount={transactionDetails.amount}
    />
  );
};
