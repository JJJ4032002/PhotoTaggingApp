import "./App.css";
import Navbar from "./Components/Navbar";
import MainPage from "./Components/MainPage";
import Instructions from "./Components/Instructions";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

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

  return (
    <div className="App">
      <Navbar></Navbar>
      <MainPage></MainPage>
      <Instructions></Instructions>
    </div>
  );
}

export default App;
