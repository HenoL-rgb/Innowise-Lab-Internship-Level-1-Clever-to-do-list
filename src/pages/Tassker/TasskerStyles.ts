import styled from "styled-components";
import { themeSettings } from "../../themeSetting";

export const TasskerWrapper = styled.div`
  position: relative;
  width: 100%;
  display: flex;
  flex-direction: column;
  row-gap: 10px;
  padding: 0 20px;
  color: ${themeSettings.app.color};
  background-color: ${themeSettings.app.bg};
  @media screen and (max-width: 720px) {
    padding: 0;
  }
`;

export const LoaderWrapper = styled.div`
  position: relative;
  height: 450px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const Header = styled.div`
  position: relative;
  display: flex;
  column-gap: 20px;
  justify-content: center;
  align-items: center;
  h1 {
    cursor: pointer;
  }
  @media screen and (max-width: 720px) {
    h1 {
      font-size: 24px;
    }
    column-gap: 5px;
  }
`;

export const CalendarInput = styled.input`
  position: absolute;
  width: 0;
  height: 0;
  left: 50%;
  top: 50%;
  opacity: 0;
`