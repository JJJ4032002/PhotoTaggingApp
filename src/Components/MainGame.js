import styled from "styled-components";
import source from "../Images/WaldoLevel1imp.jpg";
import cursor from "../Images/cursor.png";
import React, { useEffect, useState, useRef } from "react";
import Wally from "../Images/WallyT.png";
import Wenda from "../Images/WendaT.png";
import { devices } from "../Media queries/Queries";
import background from "../Images/confetti-doodles.svg";

const Navbar = styled.nav`
  @import url("https://fonts.googleapis.com/css2?family=Indie+Flower&display=swap");
  display: flex;
  padding: 0.5em;
  gap: 0.6em;
  font-size: clamp(0.9rem, 2.5vw, 1.2rem);
  font-family: "Indie Flower";
  color: white;
  background-color: #6c63ff;
  align-items: center;
  height: 10vh;
  width: 100%;
  @media ${devices.laptop} {
    height: 12vh;
  }
`;
const Container = styled.div`
  height: 100%;
`;
const ImgContainer = styled.div`
  display: flex;
  justify-content: center;
  min-height: 100vh;
  background-size: cover;
  background-repeat: no-repeat;
  background: url(${background});
`;
const Image = styled.img`
  object-fit: cover;
  width: 100%;
  position: relative;
  margin: 1em 0;

  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
  @media ${devices.tablet} {
    width: 768px;
    height: 600px;
  }
  @media ${devices.laptop} {
    width: 1024px;
    height: 768px;
  }
  @media ${devices.laptopL} {
    width: 1440px;
    height: 720px;
  }
  @media ${devices.desktop} {
    width: 2560px;
    height: 1300px;
  }

  &:hover {
    cursor: url(${cursor}), default;
  }
`;
const ImageNav = styled.img`
  height: 100%;
`;
const Card = styled.div.attrs((props) => {
  return { Y: props.Y || `-1000px` };
})`
  position: absolute;
  height: 150px;
  padding: 0.4em;
  width: 40%;
  top: ${(props) => props.Y};
  left: 30%;
  font-family: "Indie Flower";
  right: 30%;
  font-weight: 800;
  text-align: center;
  background: white;
  border-radius: 0.5em;
  transition: top 300ms ease-in-out;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
  z-index: 2;
  @media ${devices.laptop} {
    width: 20%;
    left: 40%;
    right: 40%;
  }
`;
const InnerFlex = styled.div`
  display: flex;
  align-items: center;
  height: 75%;
  margin-top: 0.2em;
`;
const ImageDiv = styled.img`
  width: 100%;
  height: 70%;
  object-fit: scale-down;
  cursor: pointer;
`;
const InnerDiv = styled.div`
  height: 100%;
  width: 50%;
`;
const AbsImage = styled.img.attrs((props) => {
  return {
    IX: `${props.IO[0]}px`,
    IY: `${props.IO[1]}px`,
  };
})`
  position: absolute;
  top: ${(props) => props.IY};
  left: ${(props) => props.IX};
  height: 70px;
  width: 70px;
  z-index: 1;
`;
function MainGame() {
  //State to bring card on screen when clicked.
  const [CoordCard, setCoordCard] = useState(0);
  //State to bring marker on screen when image clicked.
  const [CoordCursor, setCoordCursor] = useState([-1000, -1000]);
  //State to validate when to render card and to make it vanish.
  const [RendCard, setRendCard] = useState({ bool: false, X: 0, Y: 0 });
  //Targeting Cursor Image
  const CursorImageEl = useRef(null);
  //Targeting the Main Puzzle Image
  const PuzzleImageEl = useRef(null);
  //Function is called when a particular place in page is clicked
  function ImageClicked(e) {
    console.log(e.target.attributes);

    console.log(e.pageX, e.pageY);
    setRendCard((parameter) => ({
      bool: !parameter.bool,
      X: e.clientX,
      Y: e.pageY,
    }));
  }
  //Runs when rendcard is changed bringing marker and card on screen.
  useEffect(() => {
    if (RendCard.bool) {
      setCoordCard(`20%`);
      setCoordCursor([+RendCard.X, +RendCard.Y]);
    } else {
      setCoordCard(0);
      setCoordCursor([-1000, -1000]);
    }
  }, [RendCard]);
  //Getting the coordinates of the character with repsect to the card.
  useEffect(() => {
    console.log(window.scrollY);
    let rect = CursorImageEl.current.getBoundingClientRect();
    let imageRect = PuzzleImageEl.current.getBoundingClientRect();
    console.log(imageRect.left, imageRect.top, imageRect.top + window.scrollY);
    console.log(rect.left, rect.top, rect.top + window.scrollY);
    console.log(
      rect.top + window.scrollY - (imageRect.top + window.scrollY),
      rect.left - imageRect.left
    );
  }, [CoordCursor]);
  //Jsx
  return (
    <Container>
      <Navbar>
        <h1>Find :</h1>
        <ImageNav src={Wally}></ImageNav>
        <ImageNav src={Wenda}></ImageNav>
      </Navbar>

      <ImgContainer>
        <Image ref={PuzzleImageEl} onClick={ImageClicked} src={source}></Image>
        <AbsImage ref={CursorImageEl} IO={CoordCursor} src={cursor}></AbsImage>
      </ImgContainer>

      <Card Y={CoordCard}>
        <h3>Who is it</h3>
        <InnerFlex>
          <InnerDiv>
            <ImageDiv src={Wally}></ImageDiv>
            <p>Wally</p>
          </InnerDiv>
          <InnerDiv>
            <ImageDiv src={Wenda}></ImageDiv>
            <p>Wenda</p>
          </InnerDiv>
        </InnerFlex>
      </Card>
    </Container>
  );
}

export default MainGame;
