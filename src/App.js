import "./App.css";
import Navbar from "./Components/Navbar";
import MainPage from "./Components/MainPage";
import Instructions from "./Components/Instructions";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import getDocument from "./Firebase/getDocument";
import { sizes } from "./Media queries/Queries";

function App() {
  const { pathname, hash, key } = useLocation();
  useEffect(() => {
    // if not a hash link, scroll to top
    if (hash === "") {
      window.scrollTo(0, 0);
    }
    // else scroll to id
    else {
      setTimeout(() => {
        const id = hash.replace("#", "");
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView();
        }
      }, 0);
    }
  }, [pathname, hash, key]); // do this on route change

  useEffect(() => {
    console.log(window.innerHeight, window.innerWidth);
    const widthScreen = window.innerWidth;
    if (widthScreen < Number(sizes.laptopL.split("px")[0])) {
      getDocument("LaptopCoord");
    }
  }, []);
  return (
    <div className="App">
      <Navbar></Navbar>
      <MainPage></MainPage>
      <Instructions></Instructions>
    </div>
  );
}

export default App;
