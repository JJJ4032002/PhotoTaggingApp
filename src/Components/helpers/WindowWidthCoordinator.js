import { sizes } from "../../Media queries/Queries";
function WindowWidthCoordinator(
  windowWidthSetter,
  CharacterData,
  CharacterArr,
  size
) {
  console.log("Set the window result coordinates");
  windowWidthSetter([]);
  for (let i = 0; i < CharacterArr.length; i++) {
    if (size[0] < Number(sizes.laptop.split("px")[0])) {
      windowWidthSetter((prevItems) => {
        return [
          ...prevItems,
          {
            CharName: CharacterArr[i].CharName,
            Coord:
              CharacterData[`${CharacterArr[i].CharName}Coord`]["TabletCoord"],
          },
        ];
      });
    } else if (size[0] < Number(sizes.laptopL.split("px")[0])) {
      windowWidthSetter((prevItems) => {
        return [
          ...prevItems,

          {
            CharName: CharacterArr[i].CharName,
            Coord:
              CharacterData[`${CharacterArr[i].CharName}Coord`]["LaptopCoord"],
          },
        ];
      });
    } else if (size[0] < Number(sizes.desktop.split("px")[0])) {
      windowWidthSetter((prevItems) => {
        return [
          ...prevItems,

          {
            CharName: CharacterArr[i].CharName,
            Coord:
              CharacterData[`${CharacterArr[i].CharName}Coord`]["LaptopLCoord"],
          },
        ];
      });
    } else {
      windowWidthSetter((prevItems) => {
        return [
          ...prevItems,

          {
            CharName: CharacterArr[i].CharName,
            Coord:
              CharacterData[`${CharacterArr[i].CharName}Coord`]["DesktopCoord"],
          },
        ];
      });
    }
  }
}

export default WindowWidthCoordinator;
