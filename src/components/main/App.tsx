import { Spinner } from '@blueprintjs/core';
import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../state/hooks';
import { getHistoricalPrice } from '../../state/slices/historicalPrices/historicalPricesSlice';
import { getPrices } from '../../state/slices/prices/pricesSlice';
import { getTransactions } from '../../state/slices/transactions/transactionsSlice';
import { RootState } from '../../state/store';
import { ICustodialTransaction } from '../../types';
import {
  convertToBackendTime,
  floorMinutesToQuarterHour
} from '../../utils/dateUtil';
import { Filters } from '../transactions/filters/Filters';
import { instanceOfCustodial } from '../transactions/helper';
import { Sort } from '../transactions/sort/Sort';
import { TransactionsList } from '../transactions/TransactionsList';
import {
  StyledAppContainer,
  StyledHeader,
  StyledSortMenu,
  StyledTransactionsList
} from './App.style';

export const App: React.FunctionComponent = () => {
  const dispatch = useAppDispatch();
  const prices = useAppSelector((state: RootState) => state.prices);
  const transactions = useAppSelector((state: RootState) => state.transactions);

  // Loading the app prices, this should have been called
  // right when the app loads, and should be called periodically
  // to update the price in the redux store
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

  // Get the historical prices for the custodial transactions
  useEffect(() => {
    if (transactions.data) {
      // Grouping the transactions timestamps into 15 minutes groups.
      // This will limit the number of backend calls, also the backend
      // returns the same price for a period of 15 minutes
      const currencyAndTimes = transactions.data.reduce(
        (acc: Set<string>, transaction: ICustodialTransaction) => {
          if (instanceOfCustodial(transaction)) {
            const currency = transaction.pair.includes('BTC') ? 'BTC' : 'ETH';
            // Creating a set of currency-timestamp so we can fetch the
            // price for this particular currency for this particular timestamp
            acc.add(
              `${currency}-${convertToBackendTime(
                floorMinutesToQuarterHour(new Date(transaction.createdAt))
              )}`
            );
          }
          return acc;
        },
        new Set()
      );
      currencyAndTimes.forEach((element: string) => {
        // For each currency-timestamp we should fetch the historical price.
        // A separate action/backend call will be made for that
        dispatch(getHistoricalPrice(element));
      });
    }
  }, [dispatch, transactions]);

  return transactions.loading ? (
    <Spinner />
  ) : (
    <StyledAppContainer>
      <StyledHeader>
        <Filters />
        <StyledSortMenu>
          <Sort />
        </StyledSortMenu>
      </StyledHeader>
      <StyledTransactionsList>
        <TransactionsList transactions={transactions.data} />
      </StyledTransactionsList>
    </StyledAppContainer>
  );
};
