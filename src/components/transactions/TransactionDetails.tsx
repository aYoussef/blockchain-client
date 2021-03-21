import { Divider, Icon, IconName } from '@blueprintjs/core';
import moment from 'moment';
import React from 'react';
import { ITransactionDetails } from '../../types';
import { TransactionDetailRow } from './TransactionDetailRow';
import {
  StyledDetailsAmounts,
  StyledDetailsWrapper,
  StyledTransactionIcon
} from './Transactions.style';

interface Props {
  transactionDetails: ITransactionDetails;
}
export const TransactionDetails: React.FunctionComponent<Props> = (props) => {
  const { transactionDetails } = props;
  return (
    <StyledDetailsWrapper>
      <StyledTransactionIcon>
        <Icon icon={transactionDetails.icon as IconName} iconSize={60} />
      </StyledTransactionIcon>
      <StyledDetailsAmounts>
        <div>{transactionDetails.amount}</div>
        <div>{transactionDetails.fiatAmount}</div>
      </StyledDetailsAmounts>
      <Divider />
      {transactionDetails.from && (
        <>
          <TransactionDetailRow title="From:" value={transactionDetails.from} />
          <Divider />
        </>
      )}
      {transactionDetails.to && (
        <>
          <TransactionDetailRow title="To:" value={transactionDetails.to} />
          <Divider />
        </>
      )}
      {transactionDetails.details && (
        <>
          <TransactionDetailRow
            title="Details:"
            value={transactionDetails.details}
          />
          <Divider />
        </>
      )}
      <TransactionDetailRow
        title="Date:"
        value={moment(transactionDetails.date).format('MMM Do YY')}
      />
      <Divider />
      <TransactionDetailRow title="Status:" value={transactionDetails.status} />
      <Divider />
    </StyledDetailsWrapper>
  );
};
