import styled from "styled-components";
import { themeSettings } from "../../themeSetting";

export const StyledBackButton = styled.button`
  margin-top: 5px;
  outline: 0;
  display: block;
  padding: 10px 12px;
  font-size: 18px;
  background-color: ${themeSettings.backBtn.default};
  color: ${themeSettings.backBtn.color};
  border: 0;
  border-radius: 5px;
  width: 20%;
  min-width: min-content;
  cursor: pointer;
  &:hover {
    background-color: ${themeSettings.backBtn.hover};
  }
  &:active {
    background-color: ${themeSettings.backBtn.active};
  }
`;

export const StyledTaskForm = styled.form`
  position: relative;
  display: flex;
  flex-direction: column;
  row-gap: 10px;
  width: 100%;
  height: 100%;
  & h3 {
    align-self: flex-start;
    font-weight: 400;
  }
  & input,
  textarea {
    margin-top: 5px;
    outline: 0;
    border: 1px solid rgba(0, 0, 0, 0.1);
    display: block;
    font-size: 16px;
    padding: 10px 12px;
  }

  & textarea {
    height: 100%;
    min-height: 500px;
  }

  & input[type="submit"] {
    width: 40%;
    align-self: center;
    font-size: 18px;
    background-color: ${themeSettings.buttons.default};
    color: ${themeSettings.buttons.color};
    border: 0;
    border-radius: 5px;
    cursor: pointer;
    &:hover {
      background-color: ${themeSettings.buttons.hover};
    }
    &:active {
      background-color: ${themeSettings.buttons.active};
    }
  }
  & div {
    display: flex;
    justify-content: space-between;
  }

  @media screen and (max-width: 720px) {
    & textarea {
      min-height: 400px;
    }
  }
`;

export const ErrorStyle = styled.span`
  color: red;
  padding-left: 10px;
`;
