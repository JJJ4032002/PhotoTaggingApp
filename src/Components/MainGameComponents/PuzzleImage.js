import React from "react";
import source from "../../Images/WaldoLevel1imp.jpg";
import cursor from "../../Images/cursor.png";
import { ImgContainer, Image, AbsImage } from "./PuzzleImageCss";
function PuzzleImage({
  PuzzleImageEl,
  CursorImageEl,
  CoordCursor,
  handleImageClicked,
  validTouch,
  StartFunction,
  MoveFunction,
}) {
  return (
    <ImgContainer>
      {validTouch ? (
        <Image
          ref={PuzzleImageEl}
          onTouchStart={StartFunction}
          onTouchMove={MoveFunction}
          onTouchEnd={handleImageClicked}
          src={source}
        ></Image>
      ) : (
        <Image
          ref={PuzzleImageEl}
          onClick={handleImageClicked}
          src={source}
        ></Image>
      )}
      <AbsImage ref={CursorImageEl} IO={CoordCursor} src={cursor}></AbsImage>
    </ImgContainer>
  );
}

export default PuzzleImage;
