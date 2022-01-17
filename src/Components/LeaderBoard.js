import React, { useState, useEffect } from "react";
import styled from "styled-components";
import background from "../Images/confetti-doodles.svg";

import { v4 as uuidv4 } from "uuid";
import delDocument from "../Firebase/delDocument";
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
function LeaderBoard({ data, complete }) {
  let [sortedData, setSortedData] = useState([]);
  useEffect(() => {
    console.log("hello");
    if ([...data].length > 0) {
      console.log("hmm");
      let filteredData = [...data].filter((ele) => {
        if (ele.AnonId) {
          delDocument(ele.AnonId, undefined);
          return false;
        } else {
          return true;
        }
      });
      if ([...data].length > 1) {
        console.log("hmm");

        let newData = [...filteredData].sort((a, b) => {
          return a.timestamp - b.timestamp;
        });
        setSortedData([...newData]);
      } else {
        setSortedData([...filteredData]);
      }
    }
  }, [complete]);

  return (
    <FlexContainer>
      <LeaderBoardBody>
        <h1>Leaderboard</h1>
        <InnerFlex>
          <FlexItems>
            {sortedData.map((ele) => {
              return <h2 key={uuidv4()}>{ele.playerName}</h2>;
            })}
          </FlexItems>
          <FlexItems>
            {sortedData.map((ele) => {
              return <h2 key={uuidv4()}>{ele.timestamp}</h2>;
            })}
          </FlexItems>
        </InnerFlex>
      </LeaderBoardBody>
    </FlexContainer>
  );
}

export default LeaderBoard;
