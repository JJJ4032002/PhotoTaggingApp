import styled from "styled-components";
import source from "../Images/WaldoLevel1imp.jpg";
import cursor from "../Images/cursor.png";
import React, { useState } from "react";
import Wally from "../Images/WallyT.png";
import Wenda from "../Images/WendaT.png";
import { devices } from "../Media queries/Queries";

const Navbar = styled.nav`
  display: flex;
  padding: 1em;
  gap: 0.6em;
  font-size: clamp(0.9rem, 2.5vw, 1.2rem);
  font-family: "Indie Flower";
  color: white;
  background-color: #6c63ff;
  align-items: center;
  height: 10%;
  width: 100%;
  @media ${devices.laptop} {
    height: 15%;
  }
`;
const Container = styled.div`
  height: 100%;
`;
const ImgContainer = styled.div`
  display: flex;
  justify-content: center;
  height: 100%;
`;
const Image = styled.img`
  object-fit: cover;
  width: 100%;
  position: relative;

  &:hover {
    cursor: url(${cursor}), default;
  }
`;
const ImageNav = styled.img`
  height: 100%;
`;
const Card = styled.div.attrs((props) => {
  return { Y: props.Y || `20%` };
})`
  position: absolute;
  height: 120px;
  width: 20%;
  top: ${(props) => props.Y};
  left: 40%;
  right: 40%;
  background: white;
`;
function MainGame() {
  const [ScaleY, setScaleY] = useState(0);
  const [RendCard, setRendCard] = useState(false);
  return (
    <Container>
      <Navbar>
        <h1>Find :</h1>
        <ImageNav src={Wally}></ImageNav>
        <ImageNav src={Wenda}></ImageNav>
      </Navbar>
      <ImgContainer>
        <Image
          onClick={function Clicked(e) {
            console.log(e.clientX, e.clientY, e.pageX, e.pageY);
          }}
          className="PuzzleImg"
          src={source}
        ></Image>
      </ImgContainer>
      <Card Y={ScaleY}>Hello</Card>
    </Container>
  );
}

export default MainGame;
