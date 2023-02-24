import React from "react";
import { Link } from "react-router-dom";
import { StyledHeader } from "./HeaderStyles";

export default function Header() {
  return (
    <StyledHeader>
      <Link to="/sign"></Link>
    </StyledHeader>
  );
}
