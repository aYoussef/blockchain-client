import { Card, Icon, IconName } from '@blueprintjs/core';
import moment from 'moment';
import React from 'react';
import {
  StyledAmount,
  StyledAmounts,
  StyledCard,
  StyledColumn,
  StyledDescription,
  StyledDetails,
  StyledIcon,
  StyledStatus,
  StyledTitle,
  StyledTransactionWrapper
} from './Transactions.style';

interface Props {
  title: string;
  amount?: string;
  date: Date;
  details?: string;
  state: string;
  fiatValue: string;
  icon: string;
  to?: string;
  from?: string;
  onClick: () => void;
}

export const TransactionCard: React.FunctionComponent<Props> = (props) => {
  const {
    amount,
    title,
    date,
    details,
    state,
    fiatValue,
    icon,
    to,
    from,
    onClick
  } = props;
  return (
    <StyledCard>
      <Card elevation={2} interactive onClick={onClick}>
        <StyledTransactionWrapper>
          <StyledColumn>
            {moment(date).format('MMM Do YY')}
            <StyledStatus>{state}</StyledStatus>
          </StyledColumn>
          <StyledIcon>
            <Icon icon={icon as IconName} iconSize={25} />
          </StyledIcon>
          <StyledDetails>
            <StyledTitle>{title}</StyledTitle>
            {details && <StyledDescription>{details}</StyledDescription>}
            {from && <StyledDescription>{from}</StyledDescription>}
            {to && <StyledDescription>{to}</StyledDescription>}
          </StyledDetails>
          <StyledAmounts>
            <StyledAmount>{amount}</StyledAmount>
            <div>{fiatValue}</div>
          </StyledAmounts>
        </StyledTransactionWrapper>
      </Card>
    </StyledCard>
  );
};
