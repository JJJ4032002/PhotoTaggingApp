import styled from "styled-components";
import { devices } from "../Media queries/Queries";

const Navbar = styled.nav`
  display: flex;
  padding: 0.5em;
  gap: 0.6em;
  font-size: clamp(0.9rem, 2.5vw, 1.2rem);
  font-family: "Indie Flower";
  color: white;
  background-color: #6c63ff;
  justify-content: space-around;
  align-items: center;
  height: 12vh;
  max-height: 170px;
  width: 100%;
  @media ${devices.laptop} {
    height: 15vh;
    max-height: 170px;
  }
`;
const NotValidHead = styled.h3`
  font-family: "Indie Flower";
`;
const Container = styled.div`
  display: flex;
  justify-content: center;

  flex-direction: column;
  text-align: center;
  min-height: 100vh;
`;

const ImageNav = styled.img`
  height: 100%;
  max-height: 60px;
`;

const InnerDiv = styled.div`
  display: flex;
  height: 100%;
  align-items: center;
  width: 25%;
`;

export { Navbar, ImageNav, Container, NotValidHead, InnerDiv };
