import { render, screen } from '@testing-library/react';
import React from 'react';
import { setHistoricalPrice } from '../../state/slices/historicalPrices/historicalPricesSlice';
import { store } from '../../state/store';
import { ReduxTestProvider } from '../../testUtils/helpers';
import { CustodialTransaction } from './CustodialTransaction';

const transaction = {
  id: '9cb327ba-6ff6-421f-b9c3-58bd3dae23a7',
  pair: 'BTC-USD',
  state: 'FINISHED',
  fiatValue: '44.34',
  fiatCurrency: 'USD',
  version: 'V2',
  type: 'sell',
  createdAt: '2020-12-05T16:33:29.755Z'
};

const historicalPrice = {
  currency: 'BTC',
  result: {
    price: 19083.54,
    timestamp: 1607185800,
    volume24h: 9448.19
  }
};

describe('BTC transaction', () => {
  beforeAll(() => {
    store.dispatch(setHistoricalPrice(historicalPrice));
  });
  const onClickMock = jest.fn();
  beforeEach(() => {
    render(
      <ReduxTestProvider>
        <CustodialTransaction transaction={transaction} onClick={onClickMock} />
      </ReduxTestProvider>
    );
  });

  test('renders details', () => {
    expect(screen.getByText(/Sold BTC/i)).toBeInTheDocument();
    expect(screen.getByText(/BTC-USD/i)).toBeInTheDocument();
    expect(screen.getByText('0.00232347')).toBeInTheDocument();
    expect(screen.getByText('$44.34')).toBeInTheDocument();
    expect(screen.getByText(/Dec 5th 20/i)).toBeInTheDocument();
    const status = screen.getByText(/FINISHED/i);
    status.click();
    expect(onClickMock).toBeCalled();
  });
});
