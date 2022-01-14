import React from "react";
import styled from "styled-components";
import background from "../Images/confetti-doodles.svg";
const FlexContainer = styled.div`
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: url(${background});
`;
function LeaderBoard() {
  return <FlexContainer></FlexContainer>;
}

export default LeaderBoard;
