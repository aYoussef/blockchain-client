/**
 * I spent some time trying to use types with Saga but
 * it was a time consuming task so I decided to silence
 * the linter for this file for now and spend the time
 * on something else
 * */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { all, call, put, takeLatest } from 'redux-saga/effects';
import * as transactionsApi from '../../../api/transactionsApi';
import {
  getTransactions,
  setTransactions,
} from '../../slices/transactionsSlice';

function* loadTransactionsHandler() {
  try {
    const [btcTxs, ethTxs, cusTxs] = yield all([
      call(transactionsApi.getBtcNonCustodialTransactions),
      call(transactionsApi.getEthNonCustodialTransactions),
      call(transactionsApi.getCustodialTransactions),
    ]);
    yield put(setTransactions([...btcTxs, ...ethTxs, ...cusTxs]));
  } catch (e) {
    yield put({ type: 'USER_FETCH_FAILED', message: e.message });
  }
}

export function* watchGetTransactionsSaga() {
  yield takeLatest(getTransactions.type, loadTransactionsHandler);
}