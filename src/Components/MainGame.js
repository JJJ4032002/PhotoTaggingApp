import styled from "styled-components";
import source from "../Images/WaldoLevel1imp.jpg";
import src from "../Images/cursor.png";
import React from "react";

const Navbar = styled.nav`
  display: flex;
  padding: 1em;

  font-family: "Indie Flower";
  color: white;
  background-color: #6c63ff;
  align-items: center;
  min-height: 15%;
  width: 100%;
`;
const Container = styled.div``;
const ImgContainer = styled.div`
  display: flex;
  justify-content: center;
`;
const Image = styled.img`
  object-fit: cover;
  width: 100%;
  &:hover {
    cursor: url(${src}), default;
  }
`;
function MainGame() {
  return (
    <Container>
      <Navbar>
        <h1>Find :</h1>
      </Navbar>
      <ImgContainer>
        <Image className="PuzzleImg" src={source}></Image>
      </ImgContainer>
    </Container>
  );
}

export default MainGame;
