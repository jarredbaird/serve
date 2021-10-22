import React, { useState, useEffect } from "react";
import axios from "axios";
import jwt from "jsonwebtoken";
import useLocalStorage from "../hooks/useLocalStorage";

/** Context: provides currentUser object and setter for it throughout app. */

const DataContext = React.createContext();
const { Provider } = DataContext;

const DataProvider = (props) => {
  const [ministries, setMinistries] = useState([]);
  const [eventTemplates, setEventTemplates] = useState([]);
  const [roles, setRoles] = useState([]);
  const [users, setUsers] = useState([]);

  useEffect(function loadMinistriesEventTemplatesAndRoles() {
    async function getAllMinistriesEventTemplatesAndRoles() {
      try {
        let allMinistries = await axios.get(
          `http://127.0.0.1:3001/ministries/`
        );
        setMinistries(
          allMinistries.data.map((ministry) => {
            return { ...ministry, selected: false };
          })
        );
        let allRoles = await axios.get(`http://127.0.0.1:3001/roles/`);
        setRoles(
          allRoles.data.map((role) => {
            return { ...role, shown: false, selected: false };
          })
        );
        let allEventTemplates = await axios.get(
          `http://127.0.0.1:3001/event-templates`
        );
        setEventTemplates(allEventTemplates.data);
      } catch (e) {
        return <div>out of luck</div>;
      }
    }
    getAllMinistriesEventTemplatesAndRoles();
  }, []);

  return (
    <Provider
      value={{
        ministries,
        setMinistries,
        roles,
        setRoles,
        eventTemplates,
        setEventTemplates,
      }}>
      {props.children}
    </Provider>
  );
};

export { DataProvider, DataContext };
