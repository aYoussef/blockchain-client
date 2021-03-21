import { Dialog } from '@blueprintjs/core';
import { render, screen } from '@testing-library/react';
import React from 'react';
import Spacing from '../../styles/Spacing';
import { TransactionDetails } from './TransactionDetails';

const transaction = {
  amount: '0.60077009',
  date: new Date('Sat Dec 05 2020 08:36:30 GMT-0800'),
  details: 'ETH-USD',
  fiatAmount: '$355.74',
  icon: 'changes',
  status: 'FINISHED',
  title: 'Sold ETH'
};

describe('Transaction details modal', () => {
  const closeModalMock = jest.fn();
  beforeEach(() => {
    render(
      <Dialog
        style={{ width: '700px' }}
        title="Sold ETH"
        isOpen
        onClose={() => closeModalMock(false)}
      >
        <TransactionDetails transactionDetails={transaction} />
      </Dialog>
    );
  });

  test('renders', () => {
    const header = screen.getByText(/Sold ETH/i);
    expect(header).toBeInTheDocument();
    expect(header).toHaveClass('bp3-heading');
    expect(screen.getByText('0.60077009')).toHaveStyle(`margin: ${Spacing[2]}`);
    expect(screen.getByText('$355.74')).toHaveStyle(`margin: ${Spacing[2]}`);
  });

  test('closes on close clicked', () => {
    const button = screen.getAllByRole('button')[0];
    expect(button).toBeInTheDocument();
    button.click();
    expect(closeModalMock).toBeCalledWith(false);
  });
});
