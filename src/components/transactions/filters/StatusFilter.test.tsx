import { render, screen } from '@testing-library/react';
import React from 'react';
import { StatusFilter } from './StatusFilter';

describe('Filters', () => {
  const changeFilter = jest.fn();
  beforeEach(() => {
    render(<StatusFilter changeFilter={changeFilter} />);
  });

  test('renders statue filter', () => {
    expect(screen.getByText(/Status filter/i)).toBeInTheDocument();
    const button = screen.getByText(/All transactions/i);
    expect(button).toBeInTheDocument();
    button.click();
    const pendingTransactions = screen.getByText(/Pending transaction/i);
    expect(pendingTransactions).toBeInTheDocument();
    pendingTransactions.click();
    expect(changeFilter).toBeCalledWith({ status: 'pending' });
  });
});
