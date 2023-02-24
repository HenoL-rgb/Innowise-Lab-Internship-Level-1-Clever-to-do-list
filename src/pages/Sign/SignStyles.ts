import styled from "styled-components";

export const LoaderWrapper = styled.div`
  min-height: 600px;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const SignWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  min-height: 600px;
  justify-content: center;
  & div {
    width: 100%;
    display: flex;
    flex-direction: column;
    row-gap: 30px;
    align-items: center;
  }
`;