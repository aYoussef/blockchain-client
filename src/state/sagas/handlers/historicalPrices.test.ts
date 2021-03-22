import { runSaga } from 'redux-saga';
import { takeEvery } from 'redux-saga/effects';
import * as pricesApi from '../../../api/pricesApi';
import {
  getHistoricalPrice,
  setHistoricalPrice,
  setHistoricalPriceError
} from '../../slices/historicalPrices/historicalPricesSlice';
import {
  loadHistoricalPricesHandler,
  watchGetHistoricalPricesSaga
} from './historicalPrices';

describe('Saga historical prices', () => {
  test('get historical prices', () => {
    const gen = watchGetHistoricalPricesSaga();
    expect(gen.next().value).toEqual(
      takeEvery(getHistoricalPrice.type, loadHistoricalPricesHandler)
    );
  });

  test('load historical prices', async () => {
    const historicalPrice = {
      timestamp: 1607185800,
      price: 19083.54,
      volume24h: 8830.05
    };
    pricesApi.fetchHistoricalPrice = jest.fn(() =>
      Promise.resolve(historicalPrice)
    );
    const dispatched = [];

    await runSaga(
      {
        dispatch: (action: never) => dispatched.push(action),
        getState: () => ({ state: 'test' })
      },
      loadHistoricalPricesHandler,
      { payload: 'BTC-1607185800' }
    ).toPromise();
    expect(pricesApi.fetchHistoricalPrice.mock.calls).toHaveLength(1);
    expect(dispatched).toHaveLength(1);
    expect(dispatched[0]).toEqual(
      setHistoricalPrice({ result: historicalPrice, currency: 'BTC' })
    );
  });

  test('load historical prices error', async () => {
    const error = 'error fetching historical prices';
    pricesApi.fetchHistoricalPrice = jest.fn(() =>
      Promise.reject({ message: error })
    );
    const dispatched = [];

    await runSaga(
      {
        dispatch: (action: never) => dispatched.push(action),
        getState: () => ({ state: 'test' })
      },
      loadHistoricalPricesHandler,
      { payload: 'BTC-1607185800' }
    ).toPromise();
    expect(dispatched).toHaveLength(1);
    expect(dispatched[0]).toEqual(setHistoricalPriceError(error));
  });
});
