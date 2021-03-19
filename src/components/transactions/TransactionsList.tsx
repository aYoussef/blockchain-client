import { Dialog } from '@blueprintjs/core';
import React, { useMemo, useState } from 'react';
import { AutoSizer, List } from 'react-virtualized';
import { useAppSelector } from '../../state/hooks';
import { RootState } from '../../state/store';
import {
  IBtcNonCustodial,
  ICustodialTransaction,
  IEthNonCustodial,
  IFilters,
  IPrice,
  ITransaction,
  ITransactionDetails
} from '../../types';
import { BtcTransaction } from './BtcTransaction';
import { CustodialTransaction } from './CustodialTransaction';
import { EthTransaction } from './EthTransaction';
import {
  filterTransactions,
  instanceOfCustodial,
  instanceOfEth,
  sortTransactions
} from './helper';
import { TransactionDetails } from './TransactionDetails';

interface Props {
  transactions: ITransaction[];
}

export const TransactionsList: React.FunctionComponent<Props> = (props) => {
  const { transactions } = props;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [
    selectedTransaction,
    setSelectedTransaction
  ] = useState<ITransactionDetails>();
  const filters: IFilters = useAppSelector((state: RootState) => state.filters);
  const sort: string = useAppSelector((state: RootState) => state.sort);
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
    return sortTransactions(filteredTransactions, sort);
  }, [filteredTransactions, sort]);

  const openTransactionDetails = (transactionDetails: ITransactionDetails) => {
    setSelectedTransaction(transactionDetails);
    setIsModalOpen(true);
  };

  const displayTransaction = (transaction: ITransaction) => {
    if (instanceOfEth(transaction)) {
      return (
        <EthTransaction
          transaction={transaction as IEthNonCustodial}
          price={prices.eth}
          onClick={openTransactionDetails}
        />
      );
    }
    if (instanceOfCustodial(transaction)) {
      return (
        <CustodialTransaction
          transaction={transaction as ICustodialTransaction}
          onClick={openTransactionDetails}
        />
      );
    }
    return (
      <BtcTransaction
        onClick={openTransactionDetails}
        transaction={transaction as IBtcNonCustodial}
        price={prices.btc}
      />
    );
  };

  const rowRenderer = ({
    style,
    index // Index of row within collection
  }) => {
    return (
      <div key={index} style={style}>
        {displayTransaction(sortedTransactions[index])}
      </div>
    );
  };

  return (
    <div style={{ height: '100%' }}>
      {selectedTransaction && (
        <Dialog
          style={{ width: '700px' }}
          title={selectedTransaction.title}
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
        >
          <TransactionDetails transactionDetails={selectedTransaction} />
        </Dialog>
      )}
      {sortedTransactions && (
        <AutoSizer>
          {({ height, width }) => {
            return (
              <List
                height={height}
                width={width}
                rowCount={sortedTransactions.length}
                rowHeight={120}
                rowRenderer={rowRenderer}
              />
            );
          }}
        </AutoSizer>
      )}
    </div>
  );
};
