import styled from "styled-components";
import background from "../Images/confetti-doodles.svg";
import { Button } from "./MainPageCss";

const FlexContainer = styled.div`
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: url(${background});
`;
const LeaderBoardBody = styled.div`
  width: 70%;
  margin: 2em auto;
  padding: 2em 0;
  background: white;
  text-align: center;
  font-family: "Indie Flower";
`;
const InnerGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-auto-rows: auto;
  width: 90%;
  margin: 1em auto;
  align-items: center;
`;

const Heading = styled.h1`
  display: block;
  font-size: clamp(1rem, 2vw, 1.5rem);
  padding: 0.5em 0em;
`;
const FlexInnerContainer = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
`;
const ButtonL = styled(Button)`
  margin-top: 0;
  font-size: clamp(1rem, 2vw, 1.5rem);
`;

export {
  FlexContainer,
  ButtonL,
  FlexInnerContainer,
  Heading,
  InnerGrid,
  LeaderBoardBody,
};
