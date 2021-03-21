/**
 * I spent some time trying to use types with Saga but
 * it was a time consuming task so I decided to silence
 * the linter for this file for now and spend the time
 * on something else
 * */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { call, put, takeLatest } from 'redux-saga/effects';
import * as pricesApi from '../../../api/pricesApi';
import {
  getPrices,
  setPrices,
  setPricesError
} from '../../slices/prices/pricesSlice';

export function* loadPricesHandler() {
  try {
    const prices = yield call(pricesApi.fetchPrices);
    yield put(setPrices(prices));
  } catch (e) {
    yield put(setPricesError(e.message));
  }
}

export function* watchGetPricesSaga() {
  yield takeLatest(getPrices.type, loadPricesHandler);
}
