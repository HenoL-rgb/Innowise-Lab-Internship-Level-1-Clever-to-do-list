import styled from "styled-components";
import { themeSettings } from "../../themeSetting";

export const SignBtn = styled.button`
  width: 100px;
  padding: 10px 12px;
  background-color: ${themeSettings.buttons.default};
  border: 0;
  border-radius: 5px;
  color: ${themeSettings.buttons.color};
  font-size: 18px;
  align-self: flex-end;
  cursor: pointer;
  &:hover {
    background-color: ${themeSettings.buttons.hover};
  }
  &:active {
    background-color: ${themeSettings.buttons.active};
  }
`;
