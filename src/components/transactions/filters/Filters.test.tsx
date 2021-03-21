import { render, screen } from '@testing-library/react';
import React from 'react';
import { ReduxTestProvider } from '../../../testUtils/helpers';
import { Filters } from './Filters';

describe('Filters', () => {
  beforeEach(() => {
    render(
      <ReduxTestProvider>
        <Filters />
      </ReduxTestProvider>
    );
  });

  test('renders statue filter', () => {
    expect(screen.getByText(/Status filter/i)).toBeInTheDocument();
  });

  test('renders currency filter', () => {
    expect(screen.getByText(/Currency filter/i)).toBeInTheDocument();
  });
});
