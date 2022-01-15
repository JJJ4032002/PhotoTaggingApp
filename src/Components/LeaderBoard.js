import React, { useState, useEffect } from "react";
import styled from "styled-components";
import background from "../Images/confetti-doodles.svg";
import getCollection from "../Firebase/getCollection";
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
const InnerFlex = styled.div`
  display: flex;
  width: 90%;
  margin: 0 auto;
`;
const FlexItems = styled.div`
  width: 50%;
`;
function LeaderBoard() {
  const [data, setData] = useState([]);
  useEffect(() => {
    getCollection(DataAdded);
    return () => {};
  }, []);
  function DataAdded(data) {
    setData((prev) => {
      return [...prev, data];
    });
  }
  return (
    <FlexContainer>
      <LeaderBoardBody>
        <h1>Leaderboard</h1>
        <InnerFlex>
          <FlexItems>
            {data.map((ele) => {
              return <h2 key={ele.id}>{ele.playerName}</h2>;
            })}
          </FlexItems>
          <FlexItems>
            {data.map((ele) => {
              return <h2 key={ele.id}>{ele.timeStamp}</h2>;
            })}
          </FlexItems>
        </InnerFlex>
      </LeaderBoardBody>
    </FlexContainer>
  );
}

export default LeaderBoard;
