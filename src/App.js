import { HashRouter, Routes, Route } from "react-router-dom";
import React, { useEffect, useState } from "react";
import MainGame from "./Components/MainGame";
import LeaderBoard from "./Components/LeaderBoard";
import WelcomePage from "./WelcomePage";
import getCollection from "./Firebase/getCollection";

function App() {
  // do this on route change
  const [data, setData] = useState([]);
  const [complete, setComplete] = useState(0);
  const [Caller, setCaller] = useState(0);
  //Setting up the new user.
  const [user, setUser] = useState("");
  function getUser(doc) {
    setUser(doc);
  }
  // useEffect(() => {
  //   getCollection(DataAdded, Reminder);
  //   return () => {};
  // }, [Caller]);

  function UpdateData() {
    setCaller((prev) => {
      return prev + 1;
    });
    setData([]);
  }
  let Context = React.createContext(UpdateData);

  function DataAdded(data) {
    setData((prev) => {
      return [...prev, data];
    });
  }
  function Reminder() {
    setComplete((complete) => {
      return complete + 1;
    });
  }

  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<WelcomePage />} />
        <Route
          path="maingame"
          element={
            <MainGame user={user} getUser={getUser} UpdateData={UpdateData} />
          }
        />
        <Route
          path="leaderboard"
          element={<LeaderBoard data={[...data]} complete={complete} />}
        ></Route>
      </Routes>
    </HashRouter>
  );
}

export default App;
