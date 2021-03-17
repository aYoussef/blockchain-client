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
  text-align: left;
`;

export const StyledTitle = styled.div`
  font-weight: bold;
  margin-bottom: ${Spacing[2]};
  color: ${Colors.textShade1};
`;

export const StyledDescription = styled.div`
  color: ${Colors.descriptionShade1};
`;

export const StyledAmount = styled.div`
  margin-bottom: ${Spacing[2]};
`;

export const StyledFiat = styled.div``;
