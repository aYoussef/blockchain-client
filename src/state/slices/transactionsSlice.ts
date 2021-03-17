import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ITransaction } from '../../types';
import { BackendResponse } from '../types';
import {
  getDefaultState,
  handleError,
  handleLoading,
  handleSuccess
} from './helpers';

const initialState: BackendResponse<ITransaction[]> = getDefaultState();

export const transactionsSlice = createSlice({
  name: 'transactions',
  initialState,
  reducers: {
    getTransactions: () => {
      return handleLoading();
    },
    setTransactions: (_, action: PayloadAction<ITransaction[]>) => {
      const transactions = action.payload;
      return handleSuccess(transactions);
    },
    setTransactionsError: (_, action: PayloadAction<string>) => {
      return handleError(action.payload);
    }
  }
});

export const {
  setTransactions,
  getTransactions,
  setTransactionsError
} = transactionsSlice.actions;

export default transactionsSlice.reducer;
