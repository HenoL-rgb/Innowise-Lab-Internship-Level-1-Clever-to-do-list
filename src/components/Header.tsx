import React from "react";
import styled from "styled-components";
import SignButton from "./SignButton";
import { Link } from "react-router-dom";

const StyledHeader = styled.div`
  width: 100%;
  display: flex;
  justify-content: end;
  column-gap: 10px;
`;

export default function Header() {
  return (
    <StyledHeader>
      <Link to='/sign'>
      </Link>
    </StyledHeader>
  );
}
