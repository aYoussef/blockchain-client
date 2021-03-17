import { Spinner } from '@blueprintjs/core';
import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../state/hooks';
import { getPrices } from '../../state/slices/pricesSlice';
import { getTransactions } from '../../state/slices/transactionsSlice';
import { RootState } from '../../state/store';
import { Filters } from '../filters/Filters';
import { TransactionsList } from '../transactions/TransactionsList';
import { StyledAppContainer } from './App.style';

export const App: React.FunctionComponent = () => {
  const dispatch = useAppDispatch();
  const prices = useAppSelector((state: RootState) => state.prices);

  useEffect(() => {
    dispatch(getPrices());
  }, [dispatch]);

  /**
   * Fetching prices shouldn't be part of the transactions
   * component since the prices object is supposed to be used
   * in multiple places in the app, like displaying the current
   * prices for example
   * So here I'm fetching the transactions only if we have the
   * prices ready, otherwise the app shouldn't have loaded in
   * the first place
   */
  useEffect(() => {
    if (prices.data) {
      dispatch(getTransactions());
    }
  }, [dispatch, prices.data]);

  const transactions = useAppSelector((state: RootState) => state.transactions);
  return transactions.loading ? (
    <Spinner />
  ) : (
    <StyledAppContainer>
      <Filters />
      <TransactionsList transactions={transactions.data} />
    </StyledAppContainer>
  );
};
