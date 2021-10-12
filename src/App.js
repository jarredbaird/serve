import { useContext, useState } from "react";

import InTheBeginning from "./InTheBeginning.js";
import "./App.css";
import UserContext from "./UserContext.js";
import { BrowserRouter } from "react-router-dom";

function App() {
  const [token, setToken] = useState(null);
  const [currentUser, setCurrentUser] = useState("");
  return (
    <BrowserRouter>
      <UserContext.Provider
        value={{ currentUser, setCurrentUser, token, setToken }}>
        <InTheBeginning />
      </UserContext.Provider>
    </BrowserRouter>
  );
}

export default App;
