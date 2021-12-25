import React from "react";
import styled from "styled-components";
import src from "./Images/undraw_house_searching_re_stk8.svg";
import { devices } from "./Media queries/Queries";
const FlexContainer = styled.div`
  display: flex;
  flex-direction: column-reverse;
  width: 95%;
  padding: 2em 0 2em 0;
  margin: 0 auto;
  min-height: 88%;
  align-items: center;
  justify-content: start;
  gap: 2em;

  @media ${devices.laptop} {
    flex-direction: row;
    gap: 1em;
    width: 90%;
    padding: 0em;
  }
`;
const TextContainer = styled.div`
  width: 100%;
  font-size: clamp(0.9rem, 2.5vw, 1.3rem);
  font-family: "Indie Flower";
  text-align: center;
  flex: 0.1 1 auto;
  @media ${devices.laptop} {
    width: 50%;
    text-align: left;
    flex: 1 1 auto;
  }
`;
const ImgContainer = styled.div`
  width: 100%;
  flex: 0.1 1 auto;

  @media ${devices.laptop} {
    width: 50%;
    flex: 1 1 auto;
  }
`;
const Image = styled.img`
  width: 100%;
`;
const Button = styled.button`
  font-size: clamp(1.3rem, 2.5vw, 1.5rem);
  padding: 0.3em 1em;
  margin-top: 1em;
  font-family: "Indie Flower";
  background-color: transparent;
  color: #6c63ff;
  border: 0.1em solid #6c63ff;
  cursor: pointer;
  font-weight: 600;
  transition: background-color 200ms ease-in, color 200ms ease-in;
  &:hover {
    background-color: #6c63ff;
    color: white;
  }
`;
function MainPage() {
  return (
    <FlexContainer>
      <TextContainer>
        <h1>Can you find all the characters in the least time?</h1>
        <Button>Play Now</Button>
      </TextContainer>
      <ImgContainer>
        <Image src={src}></Image>
      </ImgContainer>
    </FlexContainer>
  );
}

export default MainPage;
