import React, { useState, useEffect, Fragment } from "react";
import { v4 as uuidv4 } from "uuid";
import delDocument from "../Firebase/delDocument";
import { Link } from "react-router-dom";
import {
  FlexContainer,
  ButtonL,
  FlexInnerContainer,
  Heading,
  InnerGrid,
  LeaderBoardBody,
} from "./LeaderBoardCss";

function LeaderBoard({ data }) {
  let [sortedData, setSortedData] = useState([]);
  let [prevData, setPrevData] = useState([]);
  if (prevData !== data && [...data].length > 0) {
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
    setPrevData(data);
  }

  return (
    <FlexContainer>
      <LeaderBoardBody>
        <FlexInnerContainer>
          <Heading>Leaderboard</Heading>
          <Link to="/">
            <ButtonL>Home Page</ButtonL>
          </Link>
        </FlexInnerContainer>
        <InnerGrid>
          {sortedData.map((ele) => {
            return (
              <Fragment key={uuidv4()}>
                <Heading>{ele.playerName}</Heading>
                <Heading>{ele.timestamp}</Heading>
              </Fragment>
            );
          })}
        </InnerGrid>
      </LeaderBoardBody>
    </FlexContainer>
  );
}

export default LeaderBoard;
