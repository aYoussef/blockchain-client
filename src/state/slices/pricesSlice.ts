import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IPrice } from '../../types';
import { BackendResponse } from '../types';
import {
  getDefaultState,
  handleError,
  handleLoading,
  handleSuccess
} from './helpers';

const initialState: BackendResponse<IPrice> = getDefaultState();

export const pricesSlice = createSlice({
  name: 'prices',
  initialState,
  reducers: {
    getPrices: () => {
      return handleLoading();
    },
    setPrices: (_, action: PayloadAction<IPrice>) => {
      return handleSuccess(action.payload);
    },
    setPricesError: (_, action: PayloadAction<string>) => {
      return handleError(action.payload);
    }
  }
});

export const { getPrices, setPrices, setPricesError } = pricesSlice.actions;

export default pricesSlice.reducer;
