import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IHistoricalPrice, IHistoricalPrices } from '../../../types';
import { handleError, handleLoading, handleSuccess } from '../helpers';

const initialState: IHistoricalPrices = {};

export const historicalPricesSlice = createSlice({
  name: 'prices',
  initialState,
  reducers: {
    getHistoricalPrice: (state, action: PayloadAction<string>) => {
      return { ...state, [action.payload]: handleLoading() };
    },
    setHistoricalPrice: (
      state: IHistoricalPrices,
      action: PayloadAction<{ result: IHistoricalPrice; currency: string }>
    ) => {
      const {
        result: { price, timestamp },
        currency
      } = action.payload;
      const currencyTimestamp = `${currency}-${timestamp}`;
      const result = handleSuccess(price);
      return { ...state, [currencyTimestamp]: result };
    },
    setHistoricalPriceError: (
      state: IHistoricalPrices,
      action: PayloadAction<{ id: number; error: string }>
    ) => {
      const time = action.payload.id;
      return { ...state, [time]: handleError(action.payload.error) };
    }
  }
});

export const {
  getHistoricalPrice,
  setHistoricalPrice,
  setHistoricalPriceError
} = historicalPricesSlice.actions;

export default historicalPricesSlice.reducer;
