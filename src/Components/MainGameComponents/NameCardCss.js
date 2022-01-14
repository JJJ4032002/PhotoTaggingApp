import styled from "styled-components";
import { Button } from "../MainPageCss";
const CardBody = styled.div`
  position: absolute;
  width: 20%;
  max-width: 600px;
  left: 40%;
  right: 40%;
  top: 40%;
  padding: 2em;
  transform: scaleY(${(props) => props.scale});
  background-color: white;
  font-family: "Indie Flower";
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
  font-size: clamp(0.7rem, 1.5vw, 1.2rem);
  z-index: 3;
  border-radius: 0.4em;
`;
const Heading = styled.h3``;
const Form = styled.form`
  margin: 0.5em 0;
`;
const Input = styled.input`
  padding: 0.2em;
  width: 100%;
  font-weight: 700;
  font-family: "Indie Flower";
  font-size: clamp(0.7rem, 1.5vw, 1rem);
`;
const NameCardBtn = styled(Button)`
  padding: 0.2em 0.4em;
  font-size: clamp(0.7rem, 1.8vw, 1.2rem);
`;

export { CardBody, NameCardBtn, Input, Heading, Form };
