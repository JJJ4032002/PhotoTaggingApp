import styled from "styled-components";
import { devices } from "../Media queries/Queries";
const NavStyles = styled.nav`
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
    justify-content: space-around;
  }
`;
const InstructionsHead = styled.h1`
  cursor: pointer;
  color: white;

  display: none;
  @media ${devices.laptop} {
    display: block;
  }
`;

export { InstructionsHead, NavStyles };
