import { Button, FormGroup, MenuItem } from '@blueprintjs/core';
import { Select } from '@blueprintjs/select';
import React, { useState } from 'react';
import { useAppDispatch } from '../../../state/hooks';
import { setSort } from '../../../state/slices/transactions/sortSlice';
import { StyledSortWrapper } from './Sort.style';

const items = [
  { id: 'date-desc', label: 'Descending' },
  { id: 'date-asc', label: 'Ascending' }
];

export const Sort: React.FunctionComponent = () => {
  const [selected, setSelected] = useState(items[0]);
  const dispatch = useAppDispatch();
  const changeSort = (item) => {
    setSelected(item);
    dispatch(setSort(item.id));
  };

  const renderSelect = (item, { handleClick }) => (
    <MenuItem
      key={item.id}
      text={item.label}
      onClick={handleClick}
      active={item.id === selected.id}
      shouldDismissPopover
    />
  );

  return (
    <StyledSortWrapper>
      <FormGroup label="Sort by date" inline>
        <Select
          filterable={false}
          onItemSelect={changeSort}
          itemRenderer={renderSelect}
          items={items}
        >
          <Button text={selected.label} icon="double-caret-vertical" />
        </Select>
      </FormGroup>
    </StyledSortWrapper>
  );
};
