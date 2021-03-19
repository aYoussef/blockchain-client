import styled from 'styled-components';
import Colors from '../../styles/Colors';
import Spacing from '../../styles/Spacing';

export const StyledCard = styled.div`
  margin: 10px;
`;

export const StyledTransactionWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

export const StyledColumn = styled.div`
  text-align: center;
  width: 90px;
  margin-right: ${Spacing[3]};
`;

export const StyledStatus = styled.div`
  margin-top: ${Spacing[2]};
  font-weight: bold;
  color: ${Colors.descriptionShade1};
`;

export const StyledIcon = styled.div`
  width: 30px;
  text-align: center;
  margin-right: ${Spacing[3]};
`;

export const StyledDetails = styled.div`
  flex-grow: 1;
  height: 60px;
`;

export const StyledAmounts = styled.div`
  font-weight: bold;
  width: 90px;
  text-align: right;
`;

export const StyledTitle = styled.div`
  font-weight: bold;
  margin-bottom: ${Spacing[2]};
  color: ${Colors.textShade1};
`;

export const StyledDescription = styled.div`
  color: ${Colors.descriptionShade1};
  @media screen and (max-width: 850px) {
    display: none !important;
  }
`;

export const StyledAmount = styled.div`
  margin-bottom: ${Spacing[2]};
`;

export const StyledDetailsWrapper = styled.div`
  padding: ${Spacing[4]};
  text-align: center;
`;

export const StyledTransactionIcon = styled.div`
  margin: ${Spacing[4]} auto ${Spacing[3]};
`;

export const StyledDetailsAmounts = styled.div`
  font-weight: bold;
  margin-bottom: ${Spacing[4]};
  div {
    margin: ${Spacing[2]};
  }
`;

export const DetailsRowWrapper = styled.div`
  display: flex;
  flex-direction: row;
  padding: ${Spacing[1]};
`;

export const DetailsRowTitle = styled.div`
  font-weight: bold;
`;

export const DetailsRowValue = styled.div`
  margin-left: auto;
  word-break: break-word;
`;
