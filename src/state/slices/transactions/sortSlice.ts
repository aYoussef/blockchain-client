import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState = 'date-desc';

export const sortSlice = createSlice({
  name: 'sort',
  initialState,
  reducers: {
    setSort: (_, action: PayloadAction<string>) => {
      return action.payload;
    }
  }
});

export const { setSort } = sortSlice.actions;

export default sortSlice.reducer;
