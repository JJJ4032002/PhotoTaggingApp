import styled from "styled-components";
import { Button } from "../MainPageCss";
import { devices } from "../../Media queries/Queries";
const CardBody = styled.div`
  position: absolute;
  width: 45%;
  max-width: 900px;
  left: 27.5%;
  right: 27.5%;
  top: 40%;
  padding: 1em;
  transform: scaleY(${(props) => props.scale});
  background-color: white;
  font-family: "Indie Flower";
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
  font-size: clamp(0.7rem, 1.5vw, 1.2rem);
  z-index: 3;
  border-radius: 0.4em;
  @media ${devices.laptop} {
    width: 30%;
    max-width: 900px;
    left: 35%;
    right: 35%;
    top: 40%;
    padding: 1em;
  }
`;
const Heading = styled.h3``;
const Form = styled.form`
  margin: 0.5em 0;
`;
const Input = styled.input`
  padding: 0.2em;
  width: 50%;
  display: block;
  font-weight: 700;
  font-family: "Indie Flower";
  font-size: clamp(0.7rem, 1.5vw, 1rem);
  text-align: center;
  margin: 0.3em auto;
`;
const NameCardBtn = styled(Button)`
  padding: 0.2em 0.4em;
  font-size: clamp(0.7rem, 1.8vw, 1.2rem);
  margin: 0.7em 0.2em;
`;

export { CardBody, NameCardBtn, Input, Heading, Form };
