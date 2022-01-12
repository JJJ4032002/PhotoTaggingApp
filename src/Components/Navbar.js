import React from "react";

import { Link } from "react-router-dom";

import { InstructionsHead, NavStyles } from "./NavbarCss";

function Navbar() {
  return (
    <NavStyles>
      <h1>Photo Tagging App</h1>
      <Link to="/#Inst">
        <InstructionsHead>How to Play</InstructionsHead>
      </Link>
    </NavStyles>
  );
}

export default Navbar;
