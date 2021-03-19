import { Button, FormGroup, MenuItem } from '@blueprintjs/core';
import { Select } from '@blueprintjs/select';
import React, { useState } from 'react';
import { StyledFilter } from './Filters.style';

const items = [
  { id: 'all', label: 'All Currencies' },
  { id: 'btc', label: 'BTC transaction' },
  { id: 'eth', label: 'ETH transaction' }
];

interface Props {
  changeFilter: (filter) => void;
}

export const CurrencyFilter: React.FunctionComponent<Props> = (props) => {
  const { changeFilter } = props;
  const [selected, setSelected] = useState(items[0]);
  const renderSelect = (item, { handleClick }) => (
    <MenuItem
      key={item.id}
      text={item.label}
      onClick={handleClick}
      active={item.id === selected.id}
      shouldDismissPopover
    />
  );
  const handleClick = (item) => {
    setSelected(item);
    changeFilter({ currency: item.id });
  };
  return (
    <StyledFilter>
      <FormGroup label="Currency filter" inline>
        <Select
          filterable={false}
          onItemSelect={handleClick}
          itemRenderer={renderSelect}
          items={items}
        >
          <Button text={selected.label} icon="double-caret-vertical" />
        </Select>
      </FormGroup>
    </StyledFilter>
  );
};
