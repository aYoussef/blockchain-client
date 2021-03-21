import { render, screen } from '@testing-library/react';
import React from 'react';
import { ReduxTestProvider } from '../../../testUtils/helpers';
import { Sort } from './Sort';

describe('Sort', () => {
  beforeEach(() => {
    render(
      <ReduxTestProvider>
        <Sort />
      </ReduxTestProvider>
    );
  });

  test('renders sort', () => {
    expect(screen.getByText(/Sort by date/i)).toBeInTheDocument();
    const button = screen.getByText(/Descending/i);
    expect(button).toBeInTheDocument();
    button.click();
    const ascendingSort = screen.getByText(/Ascending/i);
    expect(ascendingSort).toBeInTheDocument();
    ascendingSort.click();
    // expect(changeFilter).toBeCalledWith({ status: 'pending' });
  });
});
