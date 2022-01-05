import styled from "styled-components";
import source from "../Images/WaldoLevel1imp.jpg";
import cursor from "../Images/cursor.png";
import React, { useEffect, useState, useRef, useLayoutEffect } from "react";
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
  height: 8vh;
  width: 100%;
  @media ${devices.laptop} {
    height: 12vh;
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
  width: 768px;
  height: 600px;
  position: relative;
  margin: 1em 0;

  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;

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
  //State to validate if screen width is enough to render the page
  const [validWidth, setValidWidth] = useState(false);
  //State to validate if device has touch screen support or not
  const [validTouch, setValidTouch] = useState(false);
  const size = useWindowSize();

  //Targeting Cursor Image
  const CursorImageEl = useRef(null);
  //Targeting the Main Puzzle Image
  const PuzzleImageEl = useRef(null);
  //Function is called when a particular place in page is clicked
  function ImageClicked(e) {
    let X = 0;
    let Y = 0;
    if (validTouch) {
      console.log(e.target);
      console.log(e.changedTouches[0].pageX);
      X = e.changedTouches[0].clientX;
      console.log(e.changedTouches[0].pageY);
      Y = e.changedTouches[0].pageY;
    } else {
      console.log(e.target.attributes);

      console.log(e.pageX, e.pageY);
      X = e.clientX;
      Y = e.pageY;
    }
    setRendCard((parameter) => ({
      bool: !parameter.bool,
      X: X,
      Y: Y,
    }));
  }
  //Check the window width and decide if the level is playable or not.
  useLayoutEffect(() => {
    if (size[0] < 768) {
      setValidWidth(true);
    } else {
      setValidWidth(false);
    }

    return () => {};
  }, [size]);

  useLayoutEffect(() => {
    if (window.matchMedia("(pointer: coarse)").matches) {
      // touchscreen
      console.log("Touch screen");
      setValidTouch(true);
    } else {
      setValidTouch(false);
    }
    return () => {};
  }, []);
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
    if (RendCard.bool) {
      console.log(window.scrollY);
      let rect = CursorImageEl.current.getBoundingClientRect();
      let imageRect = PuzzleImageEl.current.getBoundingClientRect();
      console.log(
        imageRect.left,
        imageRect.top,
        imageRect.top + window.scrollY
      );
      console.log(rect.left, rect.top, rect.top + window.scrollY);
      console.log(
        rect.top + window.scrollY - (imageRect.top + window.scrollY),
        rect.left - imageRect.left
      );
    }
  }, [CoordCursor]);
  //Jsx
  return (
    <Container>
      {validWidth ? (
        <NotValidHead>
          Sorry your device width is too small rotate your device or play it on
          a bigger device
        </NotValidHead>
      ) : (
        <>
          <Navbar>
            <h1>Find :</h1>
            <ImageNav src={Wally}></ImageNav>
            <ImageNav src={Wenda}></ImageNav>
          </Navbar>

          <ImgContainer>
            {validTouch ? (
              <Image
                ref={PuzzleImageEl}
                onTouchStart={ImageClicked}
                src={source}
              ></Image>
            ) : (
              <Image
                ref={PuzzleImageEl}
                onClick={ImageClicked}
                src={source}
              ></Image>
            )}
            <AbsImage
              ref={CursorImageEl}
              IO={CoordCursor}
              src={cursor}
            ></AbsImage>
          </ImgContainer>

          <Card Y={CoordCard}></Card>
        </>
      )}
    </Container>
  );
}

export default MainGame;
