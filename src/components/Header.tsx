import React from "react";
import { Link } from "react-router-dom";
import { StyledHeader } from "./styles/HeaderStyles";

export default function Header() {
  return (
    <StyledHeader>
      <Link to='/sign'>
      </Link>
    </StyledHeader>
  );
}
