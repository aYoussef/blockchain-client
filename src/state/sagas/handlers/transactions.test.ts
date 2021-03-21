import { runSaga } from 'redux-saga';
import { takeLatest } from 'redux-saga/effects';
import * as transactionsApi from '../../../api/transactionsApi';
import {
  getTransactions,
  setTransactions,
  setTransactionsError
} from '../../slices/transactions/transactionsSlice';
import {
  loadTransactionsHandler,
  watchGetTransactionsSaga
} from './transactions';

describe('Saga transactions', () => {
  test('get transactions', () => {
    const gen = watchGetTransactionsSaga();
    expect(gen.next().value).toEqual(
      takeLatest(getTransactions.type, loadTransactionsHandler)
    );
  });

  test('load transactions', async () => {
    const btcTransactions = ['btc1', 'btc2'];
    transactionsApi.getBtcNonCustodialTransactions = jest.fn(() =>
      Promise.resolve(btcTransactions)
    );
    const ethTransactions = ['eth1', 'eth2'];
    transactionsApi.getEthNonCustodialTransactions = jest.fn(() =>
      Promise.resolve(ethTransactions)
    );
    const custodialTransactions = ['custodial1', 'custodial2'];
    transactionsApi.getCustodialTransactions = jest.fn(() =>
      Promise.resolve(custodialTransactions)
    );
    const dispatched = [];

    await runSaga(
      {
        dispatch: (action: never) => dispatched.push(action),
        getState: () => ({ state: 'test' })
      },
      loadTransactionsHandler
    ).toPromise();
    expect(
      transactionsApi.getBtcNonCustodialTransactions.mock.calls
    ).toHaveLength(1);
    expect(
      transactionsApi.getEthNonCustodialTransactions.mock.calls
    ).toHaveLength(1);
    expect(transactionsApi.getCustodialTransactions.mock.calls).toHaveLength(1);
    expect(dispatched).toHaveLength(1);
    expect(dispatched[0]).toEqual(
      setTransactions([
        ...btcTransactions,
        ...ethTransactions,
        ...custodialTransactions
      ])
    );
  });

  test('load transactions error', async () => {
    const error = 'error fetching transactions';
    transactionsApi.getBtcNonCustodialTransactions = jest.fn(() =>
      Promise.reject({ message: error })
    );
    const dispatched = [];

    await runSaga(
      {
        dispatch: (action: never) => dispatched.push(action),
        getState: () => ({ state: 'test' })
      },
      loadTransactionsHandler
    ).toPromise();
    expect(dispatched).toHaveLength(1);
    expect(dispatched[0]).toEqual(setTransactionsError(error));
  });
});
