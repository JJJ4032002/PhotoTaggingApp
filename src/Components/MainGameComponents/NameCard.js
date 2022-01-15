import React, { useState } from "react";

import { CardBody, NameCardBtn, Input, Heading, Form } from "./NameCardCss";

function NameCard({ scale, getPlayerName }) {
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
    }
  }
  return (
    <CardBody scale={scale}>
      <Heading>Please enter your name:</Heading>
      <Form>
        <Input onChange={ChangeVal} value={currentVal}></Input>
        <NameCardBtn onClick={Submitted}>Submit</NameCardBtn>
        <NameCardBtn>Restart</NameCardBtn>
        <NameCardBtn>LeaderBoard</NameCardBtn>
      </Form>
    </CardBody>
  );
}

export default NameCard;
