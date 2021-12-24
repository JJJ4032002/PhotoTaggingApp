import React from "react";
import styled from "styled-components";

const NavStyles = styled.nav`
  @import url("https://fonts.googleapis.com/css2?family=Indie+Flower&display=swap");
  padding: 0.6em;
  background-color: #6c63ff;
  color: white;
  font-size: 1.3em;
  font-weight: 700;
  font-family: "Indie Flower";
`;
function Navbar() {
  return (
    <NavStyles>
      <h1>Photo Tagging App</h1>
    </NavStyles>
  );
}

export default Navbar;
