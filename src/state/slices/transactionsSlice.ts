import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { BtcNonCustodial } from '../../types';

const initialState: BtcNonCustodial[] = [];

export const transactionsSlice = createSlice({
  name: 'transactions',
  initialState,
  reducers: {
    setTransactions: (state, action: PayloadAction<BtcNonCustodial[]>) => {
      const transactions = action.payload;
      return { ...state, ...transactions };
    },
    // This action will be handled by Saga
    getTransactions: () => {}
  }
});

export const { setTransactions, getTransactions } = transactionsSlice.actions;

export default transactionsSlice.reducer;
