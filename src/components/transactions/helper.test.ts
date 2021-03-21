import {
  filterTransactions,
  instanceOfBtc,
  instanceOfCustodial,
  instanceOfEth,
  sortTransactions
} from './helper';

const mockTransactions = [
  {
    amount: 3,
    insertedAt: 1596115731,
    coin: 'btc',
    state: 'PENDING'
  },
  {
    amount: 1,
    insertedAt: 1607630989,
    erc20: true,
    state: 'PENDING'
  },
  {
    amount: 2,
    createdAt: '2020-12-05T16:03:06.002Z',
    state: 'PENDING'
  },
  {
    amount: 3,
    insertedAt: 1596115731,
    coin: 'btc',
    state: 'CONFIRMED'
  },
  {
    amount: 1,
    insertedAt: 1607630989,
    erc20: true,
    state: 'CONFIRMED'
  },
  {
    amount: 2,
    createdAt: '2020-12-05T16:03:06.002Z',
    state: 'FINISHED'
  }
];

describe('Helper', () => {
  test('instanceOfEth', () => {
    const ethTransaction = {
      erc20: false
    };
    expect(instanceOfEth(ethTransaction)).toBeTruthy();
    expect(instanceOfBtc(ethTransaction)).toBeFalsy();
    expect(instanceOfCustodial(ethTransaction)).toBeFalsy();
  });
  test('instanceOfBtc', () => {
    const btcTransaction = {
      coin: 'btc'
    };
    expect(instanceOfBtc(btcTransaction)).toBeTruthy();
    expect(instanceOfCustodial(btcTransaction)).toBeFalsy();
    expect(instanceOfEth(btcTransaction)).toBeFalsy();
  });
  test('instanceOfCustodial', () => {
    const custodialTransaction = {
      createdAt: new Date()
    };
    expect(instanceOfCustodial(custodialTransaction)).toBeTruthy();
    expect(instanceOfBtc(custodialTransaction)).toBeFalsy();
    expect(instanceOfEth(custodialTransaction)).toBeFalsy();
  });

  test('sort descending', () => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    const sortedTransactions = sortTransactions(mockTransactions, 'date-desc');
    expect(sortedTransactions[0].amount).toEqual(1);
    expect(sortedTransactions[2].amount).toEqual(2);
    expect(sortedTransactions[4].amount).toEqual(3);
  });

  test('sort ascending', () => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    const sortedTransactions = sortTransactions(mockTransactions, 'date-asc');
    expect(sortedTransactions[0].amount).toEqual(3);
    expect(sortedTransactions[2].amount).toEqual(2);
    expect(sortedTransactions[4].amount).toEqual(1);
  });

  test('filter transactions', () => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    let filteredTransactions = filterTransactions(mockTransactions, {
      status: 'done'
    });
    expect(filteredTransactions).toHaveLength(3);
    expect(filteredTransactions[0].amount).toEqual(3);
    expect(filteredTransactions[1].amount).toEqual(1);
    expect(filteredTransactions[2].amount).toEqual(2);

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    filteredTransactions = filterTransactions(mockTransactions, {
      currency: 'btc',
      status: 'done'
    });
    expect(filteredTransactions).toHaveLength(1);
  });
});
