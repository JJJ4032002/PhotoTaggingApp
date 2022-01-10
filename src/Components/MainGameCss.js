import styled from "styled-components";
import { devices } from "../Media queries/Queries";
import background from "../Images/confetti-doodles.svg";
const Navbar = styled.nav`
  display: flex;
  padding: 0.5em;
  gap: 0.6em;
  font-size: clamp(0.9rem, 2.5vw, 1.2rem);
  font-family: "Indie Flower";
  color: white;
  background-color: #6c63ff;
  justify-content: space-around;
  align-items: center;
  height: 12vh;
  width: 100%;
  @media ${devices.laptop} {
    height: 15vh;
  }
`;
const NotValidHead = styled.h3`
  font-family: "Indie Flower";
`;
const Container = styled.div`
  display: flex;
  justify-content: center;

  flex-direction: column;
  text-align: center;
  min-height: 100vh;
`;
const ImgContainer = styled.div`
  display: flex;
  justify-content: center;
  min-height: 100vh;
  background-size: cover;
  background-repeat: no-repeat;
  background: url(${background});
`;
const Image = styled.img`
  object-fit: cover;
  width: 100%;
  width: 768px;
  height: 600px;
  position: relative;
  margin: 1em 0;

  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;

  @media ${devices.laptop} {
    width: 1024px;
    height: 768px;
  }
  @media ${devices.laptopL} {
    width: 1440px;
    height: 720px;
  }
  @media ${devices.desktop} {
    width: 2560px;
    height: 1300px;
  }

  &:hover {
    cursor: crosshair;
  }
`;
const ImageNav = styled.img`
  height: 100%;
`;

const AbsImage = styled.img.attrs((props) => {
  return {
    IX: `${props.IO[0]}px`,
    IY: `${props.IO[1]}px`,
  };
})`
  position: absolute;
  top: ${(props) => props.IY};
  left: ${(props) => props.IX};
  height: 70px;
  width: 70px;
  z-index: 1;
`;
const InnerDiv = styled.div`
  display: flex;
  height: 100%;
  align-items: center;
  width: 20%;
`;

export {
  Navbar,
  AbsImage,
  ImageNav,
  Image,
  ImgContainer,
  Container,
  NotValidHead,
  InnerDiv,
};
