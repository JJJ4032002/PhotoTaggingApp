import React from "react";
import CharacterArr from "./Character";
import styled from "styled-components";
import { devices } from "../../Media queries/Queries";
const InnerFlex = styled.div`
  display: flex;
  align-items: center;
  height: 75%;
  margin-top: 0.2em;
`;
const ImageDiv = styled.img`
  width: 100%;
  height: 70%;
  object-fit: scale-down;
  cursor: pointer;
`;
const InnerDiv = styled.div`
  height: 100%;
  width: 50%;
`;

const CardBody = styled.div.attrs((props) => {
  return { Y: props.Y || `-1000px` };
})`
  position: absolute;
  height: 150px;
  padding: 0.4em;
  width: 40%;
  top: ${(props) => props.Y};
  left: 30%;
  font-family: "Indie Flower";
  right: 30%;
  font-weight: 800;
  text-align: center;
  background: white;
  border-radius: 0.5em;
  transition: top 300ms ease-in-out;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
  z-index: 2;
  @media ${devices.laptop} {
    width: 20%;
    left: 40%;
    right: 40%;
  }
`;

function Card({ Y }) {
  return (
    <CardBody Y={Y}>
      <h3>Who is it</h3>
      <InnerFlex>
        {CharacterArr.map((char) => {
          return (
            <InnerDiv key={char.id}>
              <ImageDiv src={char.src}></ImageDiv>
              <p>{char.CharName}</p>
            </InnerDiv>
          );
        })}
      </InnerFlex>
    </CardBody>
  );
}

export default Card;
