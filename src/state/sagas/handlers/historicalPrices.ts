/**
 * I spent some time trying to use types with Saga but
 * it was a time consuming task so I decided to silence
 * the linter for this file for now and spend the time
 * on something else
 * */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { call, put, takeEvery } from 'redux-saga/effects';
import * as pricesApi from '../../../api/pricesApi';
import {
  getHistoricalPrice,
  setHistoricalPrice,
  setHistoricalPriceError
} from '../../slices/historicalPrices/historicalPricesSlice';

function* loadHistoricalPricesHandler(action) {
  const [currency, timestamp] = action.payload.split('-');
  try {
    const result = yield call(
      pricesApi.fetchHistoricalPrice,
      timestamp,
      currency
    );
    yield put(setHistoricalPrice({ result, currency }));
  } catch (e) {
    yield put(setHistoricalPriceError(e.message));
  }
}

export function* watchGetHistoricalPricesSaga() {
  yield takeEvery(getHistoricalPrice.type, loadHistoricalPricesHandler);
}
