import Wally from "../../Images/WallyT.png";
import Wenda from "../../Images/WendaT.png";
import { v4 as uuidv4 } from "uuid";

const CharacterArr = [
  {
    src: Wally,
    CharName: "Wally",
    id: uuidv4(),
  },
  {
    src: Wenda,
    CharName: "Wenda",
    id: uuidv4(),
  },
];

export default CharacterArr;
