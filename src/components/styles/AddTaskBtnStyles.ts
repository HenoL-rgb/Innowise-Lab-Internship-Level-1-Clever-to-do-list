import styled from "styled-components";
import { themeSettings } from "../../themeSetting";

export const AddButton = styled.button`
  width: 60%;
  align-self: center;
  font-size: 18px;
  background-color: ${themeSettings.buttons.default};
  color: ${themeSettings.buttons.color};
  border: 0;
  justify-self: flex-end;
  border-radius: 5px;
  padding: 10px 12px;
  cursor: pointer;
  &:hover {
    background-color: ${themeSettings.buttons.hover};
  }
  &:active {
    background-color: ${themeSettings.buttons.active};
  }
`;
