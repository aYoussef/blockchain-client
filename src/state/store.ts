import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import rootSaga from './sagas/rootSaga';
import historicalPrices from './slices/historicalPrices/historicalPricesSlice';
import prices from './slices/prices/pricesSlice';
import filters from './slices/transactions/filtersSlice';
import sort from './slices/transactions/sortSlice';
import transactions from './slices/transactions/transactionsSlice';

// Getting the default middleware without thunk since
// we/ll be using Saga's middleware
const defaultMiddleWare = getDefaultMiddleware({
  thunk: false
});

const sagaMiddleware = createSagaMiddleware();

export const store = configureStore({
  reducer: { transactions, prices, filters, sort, historicalPrices },
  middleware: [...defaultMiddleWare, sagaMiddleware]
});

sagaMiddleware.run(rootSaga);

// Extracting the store and dispatch types to be used
// with useSelector and useDispatch
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
