import React from 'react';
import {
  DetailsRowTitle,
  DetailsRowValue,
  DetailsRowWrapper
} from './Transactions.style';

interface Props {
  title: string;
  value: string;
}

export const TransactionDetailRow: React.FunctionComponent<Props> = (props) => {
  const { title, value } = props;
  return (
    <DetailsRowWrapper>
      <DetailsRowTitle>{title}</DetailsRowTitle>
      <DetailsRowValue>{value}</DetailsRowValue>
    </DetailsRowWrapper>
  );
};
