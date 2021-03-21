import { render, screen } from '@testing-library/react';
import React from 'react';
import { EthTransaction } from './EthTransaction';

const transaction = {
  amount: 19313120320400000,
  blockHeight: '10561201',
  data: undefined,
  description: 'Pineapples belong on pizza',
  erc20: false,
  from: 'My Ether Wallet',
  hash: '0x335f01c4b5cccda2b24708a42337cafa3628a888792d4b40f0aef3499a281eca',
  insertedAt: 1596115731,
  state: 'PENDING',
  to: '0x732904f98f9bd820c643331ec48d2ebce1e52c2f',
  txFee: 1464400000000,
  type: 'sent'
};

describe('Eth transaction', () => {
  const onClickMock = jest.fn();
  beforeEach(() => {
    render(
      <EthTransaction
        transaction={transaction}
        price={1223.71}
        onClick={onClickMock}
      />
    );
  });

  test('renders details', () => {
    expect(screen.getByText(/ETH sent/i)).toBeInTheDocument();
    expect(screen.getByText(/From: My Ether Wallet/i)).toBeInTheDocument();
    expect(screen.getByText('0.01931312')).toBeInTheDocument();
    expect(screen.getByText('$23.63')).toBeInTheDocument();
    expect(
      screen.getByText(/To: 0x732904f98f9bd820c643331ec48d2ebce1e52c2f/i)
    ).toBeInTheDocument();
    const status = screen.getByText(/PENDING/i);
    status.click();
    expect(onClickMock).toBeCalled();
  });
});
