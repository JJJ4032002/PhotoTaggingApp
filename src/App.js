import { HashRouter, Routes, Route } from "react-router-dom";
import React, { useCallback, useState } from "react";
import MainGame from "./Components/MainGame";
import LeaderBoard from "./Components/LeaderBoard";
import WelcomePage from "./WelcomePage";
import useCollectionListener from "./Hooks/useCollectionListener";

function App() {
  //Data processed once it gets reminded from complete.
  const [processedData, setProcessedData] = useState([]);
  //Call to get the collection again once the data updates.

  const handleProcessedData = useCallback((data) => {
    setProcessedData(data);
  }, []);

  useCollectionListener(handleProcessedData);

  //Getting the current user id.
  const [user, setUser] = useState("");
  //Setting the user
  function getUser(doc) {
    setUser(doc);
  }

  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<WelcomePage />} />
        <Route
          path="maingame"
          element={<MainGame user={user} getUser={getUser} />}
        />
        <Route
          path="leaderboard"
          element={<LeaderBoard data={processedData} />}
        ></Route>
      </Routes>
    </HashRouter>
  );
}

export default App;
