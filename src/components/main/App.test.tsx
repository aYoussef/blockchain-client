import { render, screen } from '@testing-library/react';
import React from 'react';
import { ReduxTestProvider } from '../../testUtils/helpers';
import { App } from './App';

describe('App', () => {
  beforeEach(() => {
    render(
      <ReduxTestProvider>
        <App />
      </ReduxTestProvider>
    );
  });

  test('renders filters', () => {
    expect(screen.getByText(/Status filter/i)).toBeInTheDocument();
    expect(screen.getByText(/Currency filter/i)).toBeInTheDocument();
  });

  test('renders sort', () => {
    expect(screen.getByText(/Sort by date/i)).toBeInTheDocument();
  });
});
