import styled from "styled-components";
import source from "../Images/WaldoLevel1imp.jpg";
import cursor from "../Images/cursor.png";
import React, { useEffect, useState, useRef } from "react";
import Wally from "../Images/WallyT.png";
import Wenda from "../Images/WendaT.png";
import { devices } from "../Media queries/Queries";
import background from "../Images/confetti-doodles.svg";
import Card from "./MainGameComponents/Card";
import useWindowSize from "../Hooks/useWindowSize";
const Navbar = styled.nav`
  display: flex;
  padding: 0.5em;
  gap: 0.6em;
  font-size: clamp(0.9rem, 2.5vw, 1.2rem);
  font-family: "Indie Flower";
  color: white;
  background-color: #6c63ff;
  align-items: center;
  height: 15vh;
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
  const size = useWindowSize();
  console.log(size);
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

      <Card Y={CoordCard}></Card>
    </Container>
  );
}

export default MainGame;
