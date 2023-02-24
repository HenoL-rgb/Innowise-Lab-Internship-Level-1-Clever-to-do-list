import styled from "styled-components";

export const DayWrapper = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 10px;
  align-items: center;
  padding: 30px;
  border: ${(props => props.theme.border)};
  border-radius: 15px;
  min-width: 95px;
  font-size: 18px;
  color: ${(props) => props.theme.color};
  background: ${(props) => props.theme.bgColor};
  cursor: pointer;
  &:hover {
    box-shadow: 0px 0px 3px rgba(0, 0, 0, 0.1);
  }
`;

export const StyledCircle = styled.div`
  width: 5px;
  height: 5px;
  border-radius: 50%;
  background-color: ${props => props.color};
`

export const CompletionList = styled.div`
  padding-top: 5px;
  display: flex;
  column-gap: 5px;
  height: 10px;
  justify-content: center;
`

