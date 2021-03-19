/**
 * I spent some time trying to use types with Saga but
 * it was a time consuming task so I decided to silence
 * the linter for this file for now and spend the time
 * on something else
 * */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { all } from 'redux-saga/effects';
import { watchGetHistoricalPricesSaga } from './handlers/historicalPrices';
import { watchGetPricesSaga } from './handlers/prices';
import { watchGetTransactionsSaga } from './handlers/transactions';

export default function* rootSaga() {
  yield all([
    watchGetTransactionsSaga(),
    watchGetPricesSaga(),
    watchGetHistoricalPricesSaga()
  ]);
}
