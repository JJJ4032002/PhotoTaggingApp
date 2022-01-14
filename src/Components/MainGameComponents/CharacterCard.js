import React from "react";
import CharacterArr from "./Character";

import {
  InnerDiv,
  InnerFlex,
  CardBody,
  ImageDiv,
  Para,
} from "./CharacterCardCss";

function CharacterCard({ Y, CardClicked }) {
  return (
    <CardBody Y={Y}>
      <InnerFlex>
        {CharacterArr.map((char) => {
          return (
            <InnerDiv onClick={CardClicked} key={char.id}>
              <ImageDiv id={char.CharName} src={char.src}></ImageDiv>
              <Para>{char.CharName}</Para>
            </InnerDiv>
          );
        })}
      </InnerFlex>
    </CardBody>
  );
}

export default CharacterCard;
