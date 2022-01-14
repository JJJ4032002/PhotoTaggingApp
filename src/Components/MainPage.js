import React from "react";

import src from "../Images/undraw_house_searching_re_stk8.svg";

import { Link } from "react-router-dom";
import {
  FlexContainer,
  TextContainer,
  Button,
  Image,
  ImgContainer,
  BoxFlex,
} from "./MainPageCss";

function MainPage() {
  return (
    <FlexContainer>
      <TextContainer>
        <h1>Can you find all the characters in the least time?</h1>
        <BoxFlex>
          <Link to="/maingame">
            <Button>Play Now</Button>
          </Link>
          <Link to="/leaderboard">
            <Button>LeaderBoard</Button>
          </Link>
        </BoxFlex>
      </TextContainer>
      <ImgContainer>
        <Image src={src}></Image>
      </ImgContainer>
    </FlexContainer>
  );
}

export default MainPage;
