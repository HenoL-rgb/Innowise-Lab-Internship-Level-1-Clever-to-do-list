import styled from "styled-components";
import { themeSettings } from "../../themeSetting";

export const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  row-gap: 10px;
  width: 100%;
  & input {
    width: 100%;
    max-width: 420px;
    padding: 10px 12px;
    outline: none;
    border-radius: 5px;
    border: 1px solid rgba(0, 0, 0, 0.1);
    font-size: 16px;
  }
  & input[type="submit"] {
    margin-top: 15px;
    background-color: ${themeSettings.buttons.default};
    font-size: 18px;
    width: 30%;
    min-width: min-content;
    color: white;
    border: 0;
    cursor: pointer;
    &:active {
      background-color: ${themeSettings.buttons.active};
    }
    &:hover {
      background-color: ${themeSettings.buttons.hover}
    }
  }
`;
