import React from "react";
import { FlexContainer, InstructionsDiv, ListItems } from "./InstructionsCss";

function Instructions() {
  return (
    <FlexContainer id="Inst">
      <InstructionsDiv>
        <h1>How to Play</h1>
        <ol>
          <ListItems>A list of characters will be displayed to you.</ListItems>
          <ListItems>
            You have to find those characters in a large picture in the minimal
            time to be placed higher on the leaderboard.
          </ListItems>
        </ol>
      </InstructionsDiv>
    </FlexContainer>
  );
}

export default Instructions;
