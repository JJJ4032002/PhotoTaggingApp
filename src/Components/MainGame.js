import source from "../Images/WaldoLevel1imp.jpg";
import cursor from "../Images/cursor.png";
import React, { useEffect, useState, useRef, useLayoutEffect } from "react";
import Wally from "../Images/WallyT.png";
import Wenda from "../Images/WendaT.png";

import Card from "./MainGameComponents/Card";
import useWindowSize from "../Hooks/useWindowSize";
import getDocument from "../Firebase/getDocument";
import { sizes } from "../Media queries/Queries";
import useTimer from "../Hooks/useTimer";
import {
  Navbar,
  AbsImage,
  ImageNav,
  Image,
  ImgContainer,
  Container,
  NotValidHead,
  InnerDiv,
} from "./MainGameCss";
import CharacterArr from "./MainGameComponents/Character";

function MainGame() {
  //State to bring card on screen when clicked.
  const [CoordCard, setCoordCard] = useState([-1000, -1000]);
  //State to bring marker on screen when image clicked.
  const [CoordCursor, setCoordCursor] = useState([-1000, -1000]);
  //State to validate when to render card and to make it vanish.
  const [RendCard, setRendCard] = useState({ bool: false, X: 0, Y: 0 });
  //State to validate if screen width is enough to render the page
  const [validWidth, setValidWidth] = useState(false);
  //State to validate if device has touch screen support or not
  const [validTouch, setValidTouch] = useState(false);
  //Getting window size.
  const size = useWindowSize();
  const time = useTimer();

  //Targeting Cursor Image
  const CursorImageEl = useRef(null);
  //Targeting the Main Puzzle Image
  const PuzzleImageEl = useRef(null);
  //State to get character data.
  const [CharacterData, setCharcaterData] = useState("");
  //
  const [WindowCoord, setWindowCoord] = useState([]);
  function getCharacterData(data) {
    setCharcaterData(data);
  }

  //Function is called when a particular place in page is clicked
  function ImageClicked(e) {
    let X = 0;
    let Y = 0;
    if (validTouch) {
      console.log(e.target);

      X = e.changedTouches[0].clientX;
      console.log(e.changedTouches[0].pageY);
      Y = e.changedTouches[0].pageY;
    } else {
      X = e.clientX;
      Y = e.pageY;
    }
    setRendCard((parameter) => ({
      bool: !parameter.bool,
      X: X,
      Y: Y,
    }));
  }

  function CardClicked(event) {
    if (event.target.id) {
      console.log(event.target.id);
    } else {
      console.log(event.target.textContent);
    }
  }
  // Set current window coordinates according to window width.
  useEffect(() => {
    if (CharacterData) {
      setWindowCoord([]);
      for (let i = 0; i < CharacterArr.length; i++) {
        if (size[0] < Number(sizes.laptop.split("px")[0])) {
          setWindowCoord((prevItems) => {
            return [
              ...prevItems,

              CharacterData[`${CharacterArr[i].CharName}Coord`]["TabletCoord"],
            ];
          });
        } else if (size[0] < Number(sizes.laptopL.split("px")[0])) {
          setWindowCoord((prevItems) => {
            return [
              ...prevItems,

              CharacterData[`${CharacterArr[i].CharName}Coord`]["LaptopCoord"],
            ];
          });
        } else if (size[0] < Number(sizes.desktop.split("px")[0])) {
          setWindowCoord((prevItems) => {
            return [
              ...prevItems,

              CharacterData[`${CharacterArr[i].CharName}Coord`]["LaptopLCoord"],
            ];
          });
        } else {
          setWindowCoord((prevItems) => {
            return [
              ...prevItems,

              CharacterData[`${CharacterArr[i].CharName}Coord`]["DesktopCoord"],
            ];
          });
        }
      }
    }
  }, [size, CharacterData]);
  //Check the window width and decide if the level is playable or not.
  useLayoutEffect(() => {
    console.log("lay1");
    if (size[0] < 768) {
      setValidWidth(true);
    } else {
      setValidWidth(false);
    }

    return () => {};
  }, [size]);

  useLayoutEffect(() => {
    console.log("lay2");
    if (window.matchMedia("(pointer: coarse)").matches) {
      // touchscreen
      console.log("Touch screen");
      setValidTouch(true);
    } else {
      setValidTouch(false);
    }
    return () => {};
  }, []);

  useEffect(() => {
    console.log(window.innerHeight, window.innerWidth);
    const widthScreen = window.innerWidth;
    if (widthScreen < Number(sizes.laptopL.split("px")[0])) {
      getDocument("Coordinates", getCharacterData);
    }
  }, []);
  //Runs when rendcard is changed bringing marker and card on screen.
  useEffect(() => {
    console.log("hey");
    if (RendCard.bool) {
      setCoordCard([+RendCard.X - 60, +RendCard.Y - 120]);
      setCoordCursor([+RendCard.X - 35, +RendCard.Y - 35]);
    } else {
      setCoordCard([-1000, -1000]);
      setCoordCursor([-1000, -1000]);
    }
  }, [RendCard]);
  //Getting the coordinates of the character with repsect to the card.
  useEffect(() => {
    console.log("hmm");
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
            <InnerDiv>
              <h1>Find :</h1>
              <ImageNav src={Wally}></ImageNav>
              <ImageNav src={Wenda}></ImageNav>
            </InnerDiv>
            <InnerDiv>
              <h1>{`${time.third}.${time.second}${time.first}`}</h1>
            </InnerDiv>
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

          <Card CardClicked={CardClicked} Y={CoordCard}></Card>
        </>
      )}
    </Container>
  );
}

export default MainGame;
