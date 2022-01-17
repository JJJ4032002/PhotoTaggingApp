import { HashRouter, Routes, Route } from "react-router-dom";
import React, { useEffect, useLayoutEffect, useState } from "react";
import MainGame from "./Components/MainGame";
import LeaderBoard from "./Components/LeaderBoard";
import WelcomePage from "./WelcomePage";
import delDocument from "./Firebase/delDocument";
import getCollection from "./Firebase/getCollection";

function App() {
  // do this on route change
  const [data, setData] = useState([]);
  const [complete, setComplete] = useState(0);
  const [del, setDel] = useState(0);
  const [Caller, setCaller] = useState(0);
  //Setting up the new user.
  useLayoutEffect(() => {
    getCollection(DataAdded, Reminder);
    return () => {};
  }, [Caller]);
  const [user, setUser] = useState("");
  function getUser(doc) {
    setUser(doc);
  }
  function UserDelete() {
    setDel((prev) => {
      return prev + 1;
    });
  }
  useEffect(() => {
    if (user) {
      console.log("hello");
      delDocument(user, getUser);
    }
  }, [del]);

  function UpdateData() {
    setCaller((prev) => {
      return prev + 1;
    });
    setData([]);
  }

  function DataAdded(data) {
    setData((prev) => {
      return [...prev, { ...data }];
    });
  }
  function Reminder() {
    console.log("complete");
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
            <MainGame
              user={user}
              UserDelete={UserDelete}
              getUser={getUser}
              UpdateData={UpdateData}
            />
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
