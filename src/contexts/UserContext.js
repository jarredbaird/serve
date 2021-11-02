import React, { useState, useEffect } from "react";
import axios from "axios";
import jwt from "jsonwebtoken";
import useLocalStorage from "../hooks/useLocalStorage";

/** Context: provides currentUser object and setter for it throughout app. */

const UserContext = React.createContext();
const { Provider } = UserContext;

const UserProvider = (props) => {
  const [token, setToken] = useLocalStorage("serve-token");
  const [currentUser, setCurrentUser] = useLocalStorage("currentUser");
  const [loading, setLoading] = useState(false);

  useEffect(
    function loadUserInfo() {
      async function getCurrentUser() {
        setLoading(true);
        if (token) {
          try {
            let { username } = jwt.decode(token);
            let currentUser = await axios.get(
              `http://127.0.0.1:3001/users/${username}`
            );
            setCurrentUser(JSON.stringify(currentUser.data));
          } catch (e) {
            setCurrentUser(null);
            console.log(e);
          }
        }
        setLoading(false);
      }
      getCurrentUser();
    },
    [token]
  );

  if (loading) return <div>Still loading...</div>;

  return (
    <Provider value={{ token, setToken, currentUser, setCurrentUser }}>
      {props.children}
    </Provider>
  );
};

export { UserProvider, UserContext };
