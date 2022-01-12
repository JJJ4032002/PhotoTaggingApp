import styled from "styled-components";
import background from "../../Images/confetti-doodles.svg";
import { devices } from "../../Media queries/Queries";
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

export { ImgContainer, Image, AbsImage };
