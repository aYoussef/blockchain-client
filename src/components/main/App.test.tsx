import { render, screen } from '@testing-library/react';
import React from 'react';
import { Provider } from 'react-redux';
import { store } from '../../state/store';
import { App } from './App';

const Wrapper = ({ children }) => <Provider store={store}>{children}</Provider>;

test('renders learn react link', () => {
  render(
    <Wrapper>
      <App />
    </Wrapper>
  );
  const linkElement = screen.getByText(/Status/i);
  expect(linkElement).toBeInTheDocument();
});
