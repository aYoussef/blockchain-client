import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IFilters } from '../../types';

const initialState: IFilters = {
  currency: 'all',
  status: 'all'
};

export const filtersSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    setFilters: (state: IFilters, action: PayloadAction<IFilters>) => {
      return { ...state, ...action.payload };
    }
  }
});

export const { setFilters } = filtersSlice.actions;

export default filtersSlice.reducer;
