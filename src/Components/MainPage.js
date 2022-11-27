import React from "react";
import src from "../Images/undraw_house_searching_re_stk8.svg";
import { motion } from "framer-motion";
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
            <Button
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
              whileTap={{ scale: 0.95 }}
              as={motion.div}
            >
              Play Now
            </Button>
          </Link>
          <Link to="/leaderboard">
            <Button
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
              whileTap={{ scale: 0.95 }}
              as={motion.div}
            >
              LeaderBoard
            </Button>
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
