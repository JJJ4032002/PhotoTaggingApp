import React, { useEffect, useState, useRef } from "react";
import Wally from "../Images/WallyT.png";
import Wenda from "../Images/WendaT.png";
import CharacterCard from "./MainGameComponents/CharacterCard";
import useWindowSize from "../Hooks/useWindowSize";
import getDocument from "../Firebase/getDocument";
import useTimer from "../Hooks/useTimer";
import PuzzleImage from "./MainGameComponents/PuzzleImage";
import NameCard from "./MainGameComponents/NameCard";
import sendDocument from "../Firebase/sendDocument";
import delDocument from "../Firebase/delDocument";
import updateDocument from "../Firebase/updateDocument";
import {
  Navbar,
  ImageNav,
  Container,
  NotValidHead,
  InnerDiv,
} from "./MainGameCss";
import CharacterArr from "./MainGameComponents/Character";
import { Heading } from "./MainGameComponents/NameCardCss";
import ScreenTypeValidator from "./helpers/ScreenTypeValidator";
import WindowWidthCoordinator from "./helpers/WindowWidthCoordinator";
import CustomSendDocument from "../Firebase/CustomSendDocument";

function MainGame({ user, getUser }) {
  //State to bring card on screen when clicked.
  const [CoordCard, setCoordCard] = useState([-1000, -1000]);
  //State to bring marker on screen when image clicked.
  const [CoordCursor, setCoordCursor] = useState([-1000, -1000]);
  //State to validate if screen width is enough to render the page
  const [validWidth, setValidWidth] = useState(false);
  //State to validate if device has touch screen support or not
  const [validTouch, setValidTouch] = useState(false);
  //Validates if all characters are found or not.
  const [CharFound, setCharFound] = useState(0);
  // Revealing the name card after all characters are selected.
  const [scaleSubmitCard, setScaleSubmitCard] = useState(0);
  //Selecting the characters.
  const inputRef = useRef({});
  //Reference to the Submit button
  const SubBtnRef = useRef(null);

  //Targeting Cursor Image
  const CursorImageEl = useRef(null);
  //Targeting the Main Puzzle Image
  const PuzzleImageEl = useRef(null);
  //State to get character data.
  const [CharacterData, setCharcaterData] = useState("");
  // The character coordinates for the current window.
  const [WindowCoord, setWindowCoord] = useState([]);
  //The coordinates that we get on selection.
  const [selectCoord, setSelectedCood] = useState([]);
  //Allow the character card on screen when screen touched and not on touch move
  const [ApproveOnTouch, setApproveOnTouch] = useState(false);
  const [currentDocument, setCurrentDocument] = useState(null);
  //To restart the pages;
  const [restart, setRestart] = useState(0);

  //Getting window size.
  const size = useWindowSize();
  //Timer
  const time = useTimer(restart);
  function getCurrentDocument(data) {
    setCurrentDocument(data);
  }
  //Getting the character data
  function getCharacterData(data) {
    setCharcaterData(data);
  }
  //Getting the playerName
  function getPlayerName(name) {
    async function CallCustomSendDocument() {
      if (name) {
        console.log("Got the playerName and updated the document");
        let docRef = await CustomSendDocument(name, currentDocument);
      }
    }
    CallCustomSendDocument();
  }
  //Touch Functions
  function StartFunction() {
    setApproveOnTouch(false);
  }
  function MoveFunction() {
    setApproveOnTouch(true);
  }
  //Restart the game
  function Restart(e) {
    e.preventDefault();
    setRestart((prev) => {
      return prev + 1;
    });
    CharacterArr.forEach((element) => {
      inputRef.current[`${element.CharName}`].style["opacity"] = "1";
      inputRef.current[`${element.CharName}`].style["pointer-events"] = "auto";
    });
    SubBtnRef.current.style["opacity"] = "1";
    SubBtnRef.current.style["pointer-events"] = "auto";
    setScaleSubmitCard(0);
    if (user) {
      delDocument(user, getUser);
    }
  }
  //Function is called when a particular place in page is clicked
  function handleImageClicked(e) {
    console.log("The large image is clicked");
    if (!ApproveOnTouch) {
      let X = 0;
      let Y = 0;
      if (validTouch) {
        console.log(e.target);
        X = e.changedTouches[0].clientX;
        Y = e.changedTouches[0].pageY;
      } else {
        X = e.clientX;
        Y = e.pageY;
      }

      handleElementPositions(X, Y);
    }
  }

  function handleElementPositions(X, Y) {
    if (CoordCard[0] === -1000 && CoordCursor[0] === -1000) {
      setCoordCard([+X - 60, +Y - 120]);
      setCoordCursor([+X - 35, +Y - 35]);
      let CoordXMoved = +X - 35;
      let CoordYMoved = +Y - 35;
      let imageRect = PuzzleImageEl.current.getBoundingClientRect();
      let WithRespectToImgY = CoordYMoved - (imageRect.top + window.scrollY);
      let WithRespectToImgX = CoordXMoved - imageRect.left;
      setSelectedCood([WithRespectToImgY, WithRespectToImgX]);
    } else {
      setCoordCard([-1000, -1000]);
      setCoordCursor([-1000, -1000]);
    }
  }
  // Check if card matched.
  function CardClicked(event) {
    console.log(
      "Mathing the distances if they are correct enought to select the character"
    );
    let charName = "";
    if (event.target.id) {
      charName = event.target.id;
    } else {
      charName = event.target.textContent;
    }
    WindowCoord.forEach((element) => {
      if (element.CharName === charName) {
        if (
          selectCoord[0] > element.Coord.YStart &&
          selectCoord[0] < element.Coord.YEnd &&
          selectCoord[1] > element.Coord.XStart &&
          selectCoord[1] < element.Coord.XEnd
        ) {
          console.log("character matched");
          inputRef.current[`${charName}`].style["opacity"] = "0.5";
          inputRef.current[`${charName}`].style["pointer-events"] = "none";
          if (CharFound + 1 === CharacterArr.length) {
            setScaleSubmitCard(1);
            setCharFound(0);
            handleElementPositions(0, 0);
            async function callUpdateDocument() {
              let resp = await updateDocument(user, "endTimestamp");
              let document = await getDocument("Level1", user);
              getCurrentDocument(document);
            }
            callUpdateDocument();
          } else {
            setCharFound((prev) => prev + 1);
          }
        }
      }
    });
  }

  useEffect(() => {
    if (!user) {
      sendDocument(undefined, getUser);
    }
    return () => {
      if (user) {
        delDocument(user, getUser);
      }
    };
  }, [user]);
  //Check the window width and decide if the level is playable or not.
  useEffect(() => {
    ScreenTypeValidator(setValidTouch);
    if (size[0] < 768) {
      console.log("In if loop");
      if (validWidth) {
        console.log("In In");
        setValidWidth(false);
      }
    } else {
      if (!validWidth) {
        setValidWidth(true);
        if (user) {
          updateDocument(user, "startTimestamp");
        }
      }
    }
  }, [size, validWidth, user]);

  //Getting the character data
  useEffect(() => {
    async function CallgetDocument() {
      if (CharacterData == "") {
        let data = await getDocument("ClickCoordinates", "Coordinates");
        getCharacterData(data);
      }
    }
    CallgetDocument();
    if (CharacterData) {
      //Discarding the previous coordinates
      console.log("Set the window result coordinates");
      WindowWidthCoordinator(setWindowCoord, CharacterData, CharacterArr, size);
    }
  }, [size, CharacterData]);
  //Jsx
  return (
    <Container>
      {!validWidth ? (
        <NotValidHead>
          Sorry your device width is too small rotate your device or play it on
          a bigger device
        </NotValidHead>
      ) : (
        <>
          <Navbar>
            <InnerDiv>
              <Heading>Find :</Heading>
              <ImageNav src={Wally}></ImageNav>
              <ImageNav src={Wenda}></ImageNav>
            </InnerDiv>
            <InnerDiv>
              <Heading>{`${time.third}.${time.second}${time.first}`}</Heading>
            </InnerDiv>
          </Navbar>

          <PuzzleImage
            PuzzleImageEl={PuzzleImageEl}
            handleImageClicked={handleImageClicked}
            CursorImageEl={CursorImageEl}
            CoordCursor={CoordCursor}
            validTouch={validTouch}
            StartFunction={StartFunction}
            MoveFunction={MoveFunction}
          ></PuzzleImage>
          <CharacterCard
            reference={inputRef}
            CardClicked={CardClicked}
            Y={CoordCard}
          ></CharacterCard>
          <NameCard
            getPlayerName={getPlayerName}
            Restart={Restart}
            scale={scaleSubmitCard}
            BtnReference={SubBtnRef}
          ></NameCard>
        </>
      )}
    </Container>
  );
}

export default MainGame;
