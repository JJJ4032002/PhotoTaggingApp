import React from "react";
import styled from "styled-components";
import src from "./Images/undraw_house_searching_re_stk8.svg";
const FlexContainer = styled.div`
  display: flex;
  width: 90%;
  padding: 2em 0;
  margin: 0 auto;
  align-items: center;
`;
const TextContainer = styled.div`
  width: 50%;
  font-size: 1.5em;
  font-family: "Indie Flower";
`;
const ImgContainer = styled.div`
  width: 50%;
`;
const Image = styled.img`
  width: 100%;
`;
function MainPage() {
  return (
    <FlexContainer>
      <TextContainer>
        <h1>Can you find all the characters in the least time?</h1>
      </TextContainer>
      <ImgContainer>
        <Image src={src}></Image>
      </ImgContainer>
    </FlexContainer>
  );
}

export default MainPage;
