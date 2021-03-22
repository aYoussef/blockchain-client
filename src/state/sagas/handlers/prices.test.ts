import { runSaga } from 'redux-saga';
import { takeLatest } from 'redux-saga/effects';
import * as pricesApi from '../../../api/pricesApi';
import {
  getPrices,
  setPrices,
  setPricesError
} from '../../slices/prices/pricesSlice';
import { loadPricesHandler, watchGetPricesSaga } from './prices';

describe('Saga prices', () => {
  test('get prices', () => {
    const gen = watchGetPricesSaga();
    expect(gen.next().value).toEqual(
      takeLatest(getPrices.type, loadPricesHandler)
    );
  });

  test('load prices', async () => {
    const prices = {
      btc: 100,
      eth: 50
    };
    pricesApi.fetchPrices = jest.fn(() => Promise.resolve(prices));
    const dispatched = [];

    await runSaga(
      {
        dispatch: (action: never) => dispatched.push(action),
        getState: () => ({ state: 'test' })
      },
      loadPricesHandler
    ).toPromise();
    expect(pricesApi.fetchPrices.mock.calls).toHaveLength(1);
    expect(dispatched).toHaveLength(1);
    expect(dispatched[0]).toEqual(setPrices(prices));
  });

  test('load prices error', async () => {
    const error = 'error fetching prices';
    pricesApi.fetchPrices = jest.fn(() => Promise.reject({ message: error }));
    const dispatched = [];

    await runSaga(
      {
        dispatch: (action: never) => dispatched.push(action),
        getState: () => ({ state: 'test' })
      },
      loadPricesHandler
    ).toPromise();
    expect(dispatched).toHaveLength(1);
    expect(dispatched[0]).toEqual(setPricesError(error));
  });
});
