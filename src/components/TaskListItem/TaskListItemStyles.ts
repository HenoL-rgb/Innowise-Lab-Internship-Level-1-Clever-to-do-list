import styled from "styled-components";

export const StyledTasksListItem = styled.li`
  display: flex;
  column-gap: 5px;
  font-size: 22px;
  font-weight: 400;
  position: relative;
  justify-content: space-between;
  width: 100%;
  align-items: center;
  text-decoration: ${(props) => props.theme.textDecoration};
  background-color: ${(props) => props.theme.bgColor};
  color: ${(props) => props.theme.color};

  & label {
    position: relative;
    display: flex;
    column-gap: 5px;
    height: 100%;
    align-items: center;
    width: 70%;
    & span {
        max-width: 400px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }
  }
  & input {
    border: 1px solid #ff7300;
  }
  & div {
    display: flex;

  }
`;
