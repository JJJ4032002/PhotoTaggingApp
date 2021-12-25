import React from "react";
import styled from "styled-components";
import { devices } from "./Media queries/Queries";

const NavStyles = styled.nav`
  @import url("https://fonts.googleapis.com/css2?family=Indie+Flower&display=swap");
  padding: 0.6em;
  background-color: #6c63ff;
  display: flex;
  align-items: center;
  color: white;
  font-size: clamp(1.2rem, 2.5vw, 1.5rem);
  font-weight: 700;
  font-family: "Indie Flower";
  height: 8%;
  @media ${devices.laptop} {
    height: 12%;
  }
`;
function Navbar() {
  return (
    <NavStyles>
      <h1>Photo Tagging App</h1>
    </NavStyles>
  );
}

export default Navbar;
