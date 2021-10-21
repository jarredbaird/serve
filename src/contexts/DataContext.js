import React, { useState, useEffect } from "react";
import axios from "axios";
import jwt from "jsonwebtoken";
import useLocalStorage from "../hooks/useLocalStorage";

/** Context: provides currentUser object and setter for it throughout app. */

const DataContext = React.createContext();
const { Provider } = DataContext;

const DataProvider = (props) => {
  const [ministries, setMinistries] = useLocalStorage(null);
  const [eventTemplates, setEventTemplates] = useState(null);

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
    <Provider
      value={{ ministries, setMinistries, eventTemplates, setEventTemplates }}>
      {props.children}
    </Provider>
  );
};

export { DataProvider, DataContext };
