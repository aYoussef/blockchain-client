import styled from 'styled-components';
import Spacing from '../../styles/Spacing';

export const StyledAppContainer = styled.section`
  margin: 0 auto;
  max-width: 1080px;
  height: 100%;
  display: flex;
  flex-direction: column;
`;

export const StyledHeader = styled.div`
  display: flex;
  flex-direction: row;
  @media screen and (max-width: 850px) {
    .bp3-inline {
      flex-direction: column;
    }
  }
`;

export const StyledTransactionsList = styled.div`
  flex-grow: 1;
`;

export const StyledSortMenu = styled.div`
  margin: ${Spacing[3]};
  margin-left: auto;
`;
