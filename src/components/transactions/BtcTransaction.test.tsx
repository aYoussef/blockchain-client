import { render, screen } from '@testing-library/react';
import React from 'react';
import { BtcTransaction } from './BtcTransaction';

const transaction = {
  amount: 44254,
  blockHeight: '630435',
  coin: 'BTC',
  description: '',
  doubleSpend: false,
  from: 'My Bitcoin Wallet',
  fromWatchOnly: false,
  hash: '28136caa81661574193af451f81884a932612a977962a108787b528308f19cb4',
  insertedAt: 1589523429,
  state: 'CONFIRMED',
  to: '3LtfFxw7TDXDwNQDXV1dJYQpQaYYaDpZh1',
  toAddress: '3LtfFxw7TDXDwNQDXV1dJYQpQaYYaDpZh1',
  toWatchOnly: false,
  txFee: 33896,
  type: 'sent'
};

describe('BTC transaction', () => {
  const onClickMock = jest.fn();
  beforeEach(() => {
    render(
      <BtcTransaction
        transaction={transaction}
        price={31873.21}
        onClick={onClickMock}
      />
    );
  });

  test('renders details', () => {
    expect(screen.getByText(/BTC sent/i)).toBeInTheDocument();
    expect(screen.getByText(/From: My Bitcoin Wallet/i)).toBeInTheDocument();
    expect(screen.getByText('0.00044254')).toBeInTheDocument();
    expect(screen.getByText('$14.11')).toBeInTheDocument();
    expect(
      screen.getByText(/To: 3LtfFxw7TDXDwNQDXV1dJYQpQaYYaDpZh1/i)
    ).toBeInTheDocument();
    const status = screen.getByText(/CONFIRMED/i);
    status.click();
    expect(onClickMock).toBeCalled();
  });
});
