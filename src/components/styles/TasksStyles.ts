import styled from "styled-components";

export const StyledTasksList = styled.ul`
  position: relative;
  list-style: none;
  overflow-y: scroll;
  display: flex;
  flex-direction: column;
  row-gap: 2px;
  ::-webkit-scrollbar {
    display: none;
  }
`;

export const TasksListWrapper = styled.div`
  position: relative;
  padding: 10px 0 20px;
  height: 450px;
  display: flex;
  flex-direction: column;
  row-gap: 20px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
`;
