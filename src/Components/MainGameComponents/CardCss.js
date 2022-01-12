import styled from "styled-components";
import { devices } from "../../Media queries/Queries";
const InnerFlex = styled.div`
  display: flex;
  align-items: center;

  height: 100%;
`;
const ImageDiv = styled.img`
  width: 100%;
  height: 60%;
  object-fit: scale-down;
`;
const InnerDiv = styled.div`
  height: 100%;
  width: 50%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  position: relative;
  cursor: pointer;
  &::before {
    content: "";
    position: absolute;
    width: 2px;
    height: 0%;
    left: 0;
    top: 0;
    transition: height 300ms ease;
    text-align: center;
    background-color: #6c63ff;
  }
  &::after {
    content: "";
    position: absolute;
    height: 2px;
    width: 0%;
    bottom: 0;
    left: 0;
    transition: width 300ms ease;
    text-align: center;
    background-color: #6c63ff;
  }
  &:hover::after {
    width: 100%;
  }
  &:hover::before {
    height: 100%;
  }
`;

const CardBody = styled.div.attrs((props) => {
  return { IX: `${props.Y[0]}px`, IY: `${props.Y[1]}px` };
})`
  position: absolute;
  height: 80px;
  padding: 0.3em;
  width: 15%;
  top: ${(props) => props.IY};
  left: ${(props) => props.IX};

  font-family: "Indie Flower";

  font-weight: 800;
  text-align: center;
  background: white;
  border-radius: 0.5em;

  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
  z-index: 2;
  @media ${devices.laptop} {
    width: 10%;
  }
`;
const Para = styled.p``;

export { InnerDiv, InnerFlex, CardBody, ImageDiv, Para };
