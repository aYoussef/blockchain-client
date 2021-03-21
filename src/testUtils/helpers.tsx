import React from 'react';
import { Provider } from 'react-redux';
import { store } from '../state/store';

interface Props {
  store?: unknown;
}

export const ReduxTestProvider: React.FunctionComponent<Props> = ({
  children,
  store: passedStore
}) =>
  passedStore ? (
    <Provider store={passedStore}>{children}</Provider>
  ) : (
    <Provider store={store}>{children}</Provider>
  );
