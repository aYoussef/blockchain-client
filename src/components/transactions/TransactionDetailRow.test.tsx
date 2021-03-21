import { render, screen } from '@testing-library/react';
import React from 'react';
import { TransactionDetailRow } from './TransactionDetailRow';

describe('Transaction detail row', () => {
  beforeEach(() => {
    render(<TransactionDetailRow title="Test title" value="Test value" />);
  });

  test('renders details', () => {
    const title = screen.getByText(/Test title/i);
    const value = screen.getByText(/Test value/i);
    expect(title).toBeInTheDocument();
    expect(title).toHaveStyle('font-weight: bold');
    expect(value).toBeInTheDocument();
    expect(value).toHaveStyle({
      'margin-left': 'auto',
      'word-break': 'break-word'
    });
  });
});
