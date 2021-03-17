import React from 'react';
import { useAppDispatch } from '../../state/hooks';
import { setFilters } from '../../state/slices/filtersSlice';
import { CurrencyFilter } from './CurrencyFilter';
import { StyledFiltersWrapper } from './Filters.style';
import { StatusFilter } from './StatusFilter';

export const Filters: React.FunctionComponent = () => {
  const dispatch = useAppDispatch();
  const changeFilters = (filter) => {
    dispatch(setFilters(filter));
  };

  return (
    <StyledFiltersWrapper>
      <StatusFilter changeFilter={changeFilters} />
      <CurrencyFilter changeFilter={changeFilters} />
    </StyledFiltersWrapper>
  );
};
