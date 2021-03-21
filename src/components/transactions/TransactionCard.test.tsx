import { render, screen } from '@testing-library/react';
import React from 'react';
import { TransactionCard } from './TransactionCard';

const transaction = {
  amount: '0.60077009',
  date: 'Sat Dec 05 2020 08:36:30 GMT-0800',
  details: 'ETH-USD',
  fiatAmount: '$355.74',
  icon: 'changes',
  status: 'FINISHED',
  title: 'Sold ETH'
};

describe('Transaction card', () => {
  const onClickMock = jest.fn();
  beforeEach(() => {
    render(
      <TransactionCard
        onClick={onClickMock}
        title={transaction.title}
        details={transaction.details}
        date={new Date(transaction.date)}
        state={transaction.status}
        fiatValue={transaction.fiatAmount}
        icon="changes"
        amount={transaction.amount}
      />
    );
  });

  test('renders', () => {
    expect(screen.getByText(/ETH-USD/i)).toBeInTheDocument();
    expect(screen.getByText(/Sold ETH/i)).toBeInTheDocument();
    expect(screen.getByText('0.60077009')).toBeInTheDocument();
    expect(screen.getByText('$355.74')).toBeInTheDocument();
    const status = screen.getByText(/FINISHED/i);
    status.click();
    expect(onClickMock).toBeCalled();
  });
});
