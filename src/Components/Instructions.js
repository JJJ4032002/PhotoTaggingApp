import React from "react";
import styled from "styled-components";
const FlexContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding-bottom: 1em;
  width: 95%;
  margin: 0 auto;
`;
const InstructionsDiv = styled.div`
  padding: 1.5em;
  text-align: center;
  font-size: clamp(1.1rem, 2.5vw, 1.5rem);
  width: 100%;

  background: #6c63ff;
  color: white;
  font-family: "Indie Flower";
`;
const ListItems = styled.li`
  list-style-position: inside;
`;

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
