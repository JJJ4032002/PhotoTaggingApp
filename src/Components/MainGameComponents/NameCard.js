import React, { useState } from "react";
import { Link } from "react-router-dom";

import { CardBody, NameCardBtn, Input, Heading, Form } from "./NameCardCss";

function NameCard({ scale, getPlayerName, Restart, BtnReference }) {
  const [currentVal, setCurrentVal] = useState("");

  function ChangeVal(e) {
    setCurrentVal((prev) => {
      return e.target.value;
    });
  }
  function Submitted(e) {
    e.preventDefault();
    if (currentVal === "") {
      alert("Please enter your name");
    } else {
      getPlayerName(currentVal);
      BtnReference.current.style["pointer-events"] = "none";
      BtnReference.current.style["opacity"] = "0.5";
      setCurrentVal("");
    }
  }
  return (
    <CardBody scale={scale}>
      <Heading>Please enter your name:</Heading>
      <Form>
        <Input onChange={ChangeVal} value={currentVal}></Input>
        <NameCardBtn ref={BtnReference} onClick={Submitted}>
          Submit
        </NameCardBtn>
        <NameCardBtn onClick={Restart}>Restart</NameCardBtn>
        <Link to="/leaderboard">
          <NameCardBtn>LeaderBoard</NameCardBtn>
        </Link>
      </Form>
    </CardBody>
  );
}

export default NameCard;
