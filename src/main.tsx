import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import "./firebase";
import "firebase/firestore";
import styled, { createGlobalStyle } from "styled-components";

const Global = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: 'IBM Plex sans'
  }
  body {
    display: flex;
    justify-content: center;
  }
`;



ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
      <Global />
      <App />
  </React.StrictMode>
);
