import styled from "styled-components";
import source from "../Images/WaldoLevel1imp.jpg";
import cursor from "../Images/cursor.png";
import React, { useEffect, useState, useRef } from "react";
import Wally from "../Images/WallyT.png";
import Wenda from "../Images/WendaT.png";
import { devices } from "../Media queries/Queries";
import background from "../Images/confetti-doodles.svg";

const Navbar = styled.nav`
  @import url("https://fonts.googleapis.com/css2?family=Indie+Flower&display=swap");
  display: flex;
  padding: 0.5em;
  gap: 0.6em;
  font-size: clamp(0.9rem, 2.5vw, 1.2rem);
  font-family: "Indie Flower";
  color: white;
  background-color: #6c63ff;
  align-items: center;
  height: 10vh;
  width: 100%;
  @media ${devices.laptop} {
    height: 12vh;
  }
`;
const Container = styled.div`
  height: 100%;
`;
const ImgContainer = styled.div`
  display: flex;
  justify-content: center;
  height: 100vh;
  background-size: cover;
  background-repeat: no-repeat;
  background: url(${background});
`;
const Image = styled.img`
  object-fit: cover;
  width: 100%;
  position: relative;
  margin: 1em 0;

  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
  @media ${devices.tablet} {
    width: 768px;
  }
  @media ${devices.laptop} {
    width: 1024px;
  }
  @media ${devices.laptopL} {
    width: 1440px;
  }
  @media ${devices.desktop} {
    width: 2560px;
  }

  &:hover {
    cursor: url(${cursor}), default;
  }
`;
const ImageNav = styled.img`
  height: 100%;
`;
const Card = styled.div.attrs((props) => {
  return { Y: props.Y || `-1000px` };
})`
  position: absolute;
  height: 150px;
  padding: 0.4em;
  width: 40%;
  top: ${(props) => props.Y};
  left: 30%;
  font-family: "Indie Flower";
  right: 30%;
  font-weight: 800;
  text-align: center;
  background: white;
  border-radius: 0.5em;
  transition: top 300ms ease-in-out;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
  z-index: 2;
  @media ${devices.laptop} {
    width: 20%;
    left: 40%;
    right: 40%;
  }
`;
const InnerFlex = styled.div`
  display: flex;
  align-items: center;
  height: 75%;
  margin-top: 0.2em;
`;
const ImageDiv = styled.img`
  width: 100%;
  height: 70%;
  object-fit: scale-down;
  cursor: pointer;
`;
const InnerDiv = styled.div`
  height: 100%;
  width: 50%;
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
function MainGame() {
  const [ScaleY, setScaleY] = useState(0);
  const [ScaleIY, setScaleIY] = useState([-1000, -1000]);
  const [RendCard, setRendCard] = useState({ bool: false, X: 0, Y: 0 });
  const inputEl = useRef(null);
  function ImageClicked(e) {
    console.log(e.target.attributes);

    console.log(e.pageX, e.pageY);
    setRendCard((parameter) => ({
      bool: !parameter.bool,
      X: e.clientX,
      Y: e.pageY,
    }));
  }
  useEffect(() => {
    if (RendCard.bool) {
      setScaleY(`20%`);
      setScaleIY([+RendCard.X, +RendCard.Y]);
    } else {
      setScaleY(0);
      setScaleIY([-1000, -1000]);
    }
  }, [RendCard]);

  useEffect(() => {
    console.log(window.scrollY);
    let rect = inputEl.current.getBoundingClientRect();
    console.log(rect.left, rect.top, rect.top + window.scrollY);
  }, [ScaleIY]);
  return (
    <Container>
      <Navbar>
        <h1>Find :</h1>
        <ImageNav src={Wally}></ImageNav>
        <ImageNav src={Wenda}></ImageNav>
      </Navbar>

      <ImgContainer>
        <Image
          onClick={ImageClicked}
          className="PuzzleImg"
          src={source}
        ></Image>
        <AbsImage ref={inputEl} IO={ScaleIY} src={cursor}></AbsImage>
      </ImgContainer>

      <Card Y={ScaleY}>
        <h3>Who is it</h3>
        <InnerFlex>
          <InnerDiv>
            <ImageDiv src={Wally}></ImageDiv>

            <p>Wally</p>
          </InnerDiv>
          <InnerDiv>
            <ImageDiv src={Wenda}></ImageDiv>
            <p>Wenda</p>
          </InnerDiv>
        </InnerFlex>
      </Card>
    </Container>
  );
}

export default MainGame;
