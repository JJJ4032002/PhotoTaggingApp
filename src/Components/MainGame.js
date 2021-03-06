import React, { useEffect, useState, useRef, useLayoutEffect } from "react";
import Wally from "../Images/WallyT.png";
import Wenda from "../Images/WendaT.png";
import CharacterCard from "./MainGameComponents/CharacterCard";
import useWindowSize from "../Hooks/useWindowSize";
import getDocument from "../Firebase/getDocument";
import { sizes } from "../Media queries/Queries";
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

function MainGame({ UpdateData, user, getUser, UserDelete }) {
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
  //Get the player name
  const [playerName, setPlayerName] = useState("");

  //To restart the pages;
  const [restart, setRestart] = useState(0);

  //Getting window size.
  const size = useWindowSize();
  //Timer
  const time = useTimer(restart);

  //Getting the character data
  function getCharacterData(data) {
    setCharcaterData(data);
  }
  //Getting the playerName
  function getPlayerName(name) {
    setPlayerName(name);
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
    console.log("Restarting the game");
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

    sendDocument(undefined, getUser);
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
          setCharFound((prev) => {
            return prev + 1;
          });
        }
      }
    });
  }
  //Runs after the character is found
  useEffect(() => {
    if (playerName) {
      console.log("Got the playerName and updated the document");
      console.log(playerName);

      updateDocument(user, "playerName", playerName);
      getUser("");
      setTimeout(() => {
        UpdateData();
      }, 500);
    }

    return () => {};
  }, [playerName]);
  //Will validate and perform instructions if all characters selected
  useEffect(() => {
    if (CharFound === CharacterArr.length) {
      console.log("All characters selected.");
      setScaleSubmitCard(1);

      setRendCard((parameter) => ({
        bool: !parameter.bool,
        X: 0,
        Y: 0,
      }));
      setCharFound(0);
      updateDocument(user, "endTimestamp");
    }
    return () => {};
  }, [CharFound]);
  // Set current window coordinates according to window width.
  useEffect(() => {
    if (CharacterData) {
      //Discarding the previous coordinates
      console.log("Set the window result coordinates");
      WindowWidthCoordinator(
        setWindowCoord,
        CharacterData,
        CharacterArr,
        size,
        sizes
      );
    }
  }, [size, CharacterData]);
  //Check the window width and decide if the level is playable or not.
  useLayoutEffect(() => {
    console.log("Setting up the game according to the window width");
    console.log("lay1");
    if (size[0] < 768) {
      setValidWidth(true);
      if (user) {
        console.log("Deleting the user");
        delDocument(user, getUser);
      }
    } else {
      setValidWidth(false);

      if (!user) {
        console.log("Set up the Anonymous user");
        sendDocument(undefined, getUser);
      }
    }

    return () => {
      console.log("window resized");
    };
  }, [size]);

  //Setting the image for touch screen.
  useLayoutEffect(() => {
    ScreenTypeValidator(setValidTouch);

    return () => {};
  }, []);
  //Getting the character data
  useEffect(() => {
    getDocument("Coordinates", getCharacterData);
    console.log("Got the character Data");
    return () => {
      console.log(
        "Deleting the user as they changed the page without saving the name"
      );
      UserDelete();
    };
  }, []);
  //Runs when rendcard is changed bringing marker and card on screen.
  useEffect(() => {
    console.log("Setting the Round Cusor and card as screen was clicked");
    if (RendCard.bool) {
      setCoordCard([+RendCard.X - 60, +RendCard.Y - 120]);
      setCoordCursor([+RendCard.X - 35, +RendCard.Y - 35]);
    } else {
      console.log("Removing the circle cursor and card");
      setCoordCard([-1000, -1000]);
      setCoordCursor([-1000, -1000]);
    }
  }, [RendCard]);
  //Getting the coordinates of the character with repsect to the card.
  useEffect(() => {
    console.log(
      "Now on clicking the large picture Calculating the distance of the point with respect to the large image"
    );
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
      let Y = rect.top + window.scrollY - (imageRect.top + window.scrollY);
      let X = rect.left - imageRect.left;
      setSelectedCood([Y, X]);
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
