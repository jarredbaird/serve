import React, { useState, useEffect } from "react";
import axios from "axios";

/** Context: provides allll the data for the app. */

const DataContext = React.createContext();
const { Provider } = DataContext;

const DataProvider = (props) => {
  const [ministries, setMinistries] = useState([]);
  const [eventTemplates, setEventTemplates] = useState([]);
  const [roles, setRoles] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  const getData = async () => {
    setLoading(true);
    let allMinistries = await axios.get(`http://127.0.0.1:3001/ministries/`);
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
    setEventTemplates(
      allEventTemplates.data.map((eventTemplate) => {
        return { ...eventTemplate, shown: false, selected: false };
      })
    );
    let allUsers = await axios.get(`http://127.0.0.1:3001/users/`);
    setUsers(
      allUsers.data.map((user) => {
        return { ...user };
      })
    );
    // console.debug(
    //   "**1** users array (DataContext) is: ",
    //   users,
    //   allUsers.data,
    //   "eventTemplates array (DataContext) is: ",
    //   eventTemplates
    // );
    setLoading(false);
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <Provider
      value={{
        loading,
        ministries,
        setMinistries,
        roles,
        setRoles,
        eventTemplates,
        setEventTemplates,
        users,
        setUsers,
      }}>
      {props.children}
    </Provider>
  );
};

export { DataProvider, DataContext };
