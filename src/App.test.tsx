import { render, screen } from '@testing-library/react';
import React from 'react';
import { Provider } from 'react-redux';
import App from './App';
import { store } from './state/store';

const Wrapper = ({ children }) => <Provider store={store}>{children}</Provider>;

test('renders learn react link', () => {
  render(
    <Wrapper>
      <App />
    </Wrapper>
  );
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
