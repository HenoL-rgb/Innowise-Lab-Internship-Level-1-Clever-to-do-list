import styled from "styled-components";

export const DaysListWrapper = styled.ul`
  width: 100%;
  display: flex;
  column-gap: 15px;
  list-style: none;
  overflow-x: scroll;
  padding: 10px 0 20px;
  ::-webkit-scrollbar {
    display: none;
  }
`;