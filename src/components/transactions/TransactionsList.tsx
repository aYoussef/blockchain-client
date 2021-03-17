import React, { useMemo } from 'react';
import { useAppSelector } from '../../state/hooks';
import { RootState } from '../../state/store';
import {
  IBtcNonCustodial,
  ICustodialTransaction,
  IEthNonCustodial,
  IFilters,
  IPrice,
  ITransaction
} from '../../types';
import {
  filterTransactions,
  instanceOfCustodial,
  instanceOfEth,
  sortTransactions
} from '../../utils/transactionsUtil';
import { BtcTransaction } from './BtcTransaction';
import { CustodialTransaction } from './CustodialTransaction';
import { EthTransaction } from './EthTransaction';

interface Props {
  transactions: ITransaction[];
}

export const TransactionsList: React.FunctionComponent<Props> = (props) => {
  const { transactions } = props;
  const filters: IFilters = useAppSelector((state: RootState) => state.filters);
  const prices: IPrice = useAppSelector(
    (state: RootState) => state.prices.data
  );

  const filteredTransactions = useMemo(() => {
    if (!transactions) {
      return [];
    }
    return filterTransactions(transactions, filters);
  }, [filters, transactions]);

  const sortedTransactions = useMemo(() => {
    if (!filteredTransactions) {
      return [];
    }
    return sortTransactions(filteredTransactions);
  }, [filteredTransactions]);

  const displayTransaction = (transaction: ITransaction) => {
    if (instanceOfEth(transaction)) {
      return (
        <EthTransaction
          transaction={transaction as IEthNonCustodial}
          price={prices.eth}
        />
      );
    }
    if (instanceOfCustodial(transaction)) {
      return (
        <CustodialTransaction
          transaction={transaction as ICustodialTransaction}
        />
      );
    }
    return (
      <BtcTransaction
        transaction={transaction as IBtcNonCustodial}
        price={prices.btc}
      />
    );
  };

  return (
    <div>
      {sortedTransactions &&
        sortedTransactions.map((transaction: ITransaction, index: number) => {
          // eslint-disable-next-line react/no-array-index-key
          return <div key={index}>{displayTransaction(transaction)}</div>;
        })}
    </div>
  );
};
