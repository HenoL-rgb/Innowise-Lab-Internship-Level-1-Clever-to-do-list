import styled from "styled-components";

export const LoaderWrapper = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 600px;
`;

export const LoginWrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  min-height: 600px;
  justify-content: center;
  & div {
    position: relative;
    width: 100%;
    display: flex;
    flex-direction: column;
    row-gap: 30px;
    align-items: center;
  }
`;