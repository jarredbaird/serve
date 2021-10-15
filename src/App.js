import { useEffect, useState } from "react";
import axios from "axios";
import jwt from "jsonwebtoken";

import InTheBeginning from "./InTheBeginning.js";
import "./App.css";
import UserContext from "./UserContext.js";
import { BrowserRouter } from "react-router-dom";
import useLocalStorage from "./useLocalStorage.js";
import { getNodeText } from "@testing-library/react";

function App() {
  const [token, setToken] = useLocalStorage("serve-token");
  const [currentUser, setCurrentUser] = useState();

  useEffect(
    function loadUserInfo() {
      async function getCurrentUser() {
        if (token) {
          try {
            let { username } = jwt.decode(token);
            let currentUser = axios.get(
              `http://127.0.0.1:3001/users/${username}`
            );
            setCurrentUser(currentUser);
          } catch (e) {
            setCurrentUser(null);
            console.log(e);
          }
        }
      }
      getCurrentUser();
    },
    [token]
  );

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
