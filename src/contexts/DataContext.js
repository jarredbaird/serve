import React, { useState, useEffect } from "react";
import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:3001";

/** Context: provides allll the data for the app. */

const DataContext = React.createContext();
const { Provider } = DataContext;

const DataProvider = (props) => {
  const [ministries, setMinistries] = useState([]);
  const [eventTemplates, setEventTemplates] = useState([]);
  const [roles, setRoles] = useState([]);
  const [users, setUsers] = useState([]);
  const [scheduledRoles, setScheduledRoles] = useState([]);
  const [loading, setLoading] = useState(true);

  const getData = async () => {
    setLoading(true);
    let allMinistries = await axios.get(`${BASE_URL}/ministries/`);
    setMinistries(allMinistries.data);
    let allRoles = await axios.get(`${BASE_URL}/roles/`);
    setRoles(allRoles.data);
    let allEventTemplates = await axios.get(`${BASE_URL}/event-templates`);
    setEventTemplates(allEventTemplates.data);
    let allUsers = await axios.get(`${BASE_URL}/users/`);
    setUsers(allUsers.data);
    let allScheduledRoles = await axios.get(
      `${BASE_URL}/scheduled-events/roles`
    );
    setScheduledRoles(allScheduledRoles.data);
    setLoading(false);
  };

  useEffect(() => {
    getData();
  }, []);

  if (loading) return <div>Still loading data...</div>;

  return (
    <Provider
      value={{
        loading,
        setLoading,
        ministries,
        setMinistries,
        roles,
        setRoles,
        eventTemplates,
        setEventTemplates,
        users,
        setUsers,
        scheduledRoles,
        setScheduledRoles,
      }}>
      {props.children}
    </Provider>
  );
};

export { DataProvider, DataContext };
