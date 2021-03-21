import { render, screen } from '@testing-library/react';
import React from 'react';
import { CurrencyFilter } from './CurrencyFilter';

describe('Filters', () => {
  const changeFilter = jest.fn();
  beforeEach(() => {
    render(<CurrencyFilter changeFilter={changeFilter} />);
  });

  test('renders currency filter', () => {
    expect(screen.getByText(/Currency filter/i)).toBeInTheDocument();
    const button = screen.getByText(/All Currencies/i);
    expect(button).toBeInTheDocument();
    button.click();
    const btcTransactions = screen.getByText(/BTC/i);
    expect(btcTransactions).toBeInTheDocument();
    btcTransactions.click();
    expect(changeFilter).toBeCalledWith({ currency: 'btc' });
  });
});
