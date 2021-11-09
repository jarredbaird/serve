import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { UserContext } from "../contexts/UserContext";

const UserSignedUpRoles = ({ loading, setLoading }) => {
  const { currentUser } = useContext(UserContext);
  const [signedUpRoles, setSignedUpRoles] = useState([]);

  useEffect(() => {
    setLoading(true);
    const getScheduledRoles = async () => {
      const results = await axios.get(
        `http://127.0.0.1:3001/scheduled-users/${currentUser.uId}`
      );
      setSignedUpRoles(results.data);
    };
    getScheduledRoles();
    setLoading(false);
  }, [loading]);

  console.debug("currentUser: ", currentUser);
  console.debug("currentUserScheduledRoles", signedUpRoles);

  if (loading) return <div>Loading events you have volunteered for...</div>;

  return (
    <div className="container">
      <h2 className="d-flex justify-content-center">
        all scheduled roles you are signed up for.
      </h2>
      <div className="row row-cols-1 row-cols-md-1 g-4">
        {signedUpRoles.map((scheduledEvent) => {
          return (
            <div className="col">
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">{`${new Date(
                    scheduledEvent.startTime
                  ).toDateString()} / ${scheduledEvent.etName}`}</h5>
                  <p className="card-text">
                    Location: {scheduledEvent.location}
                  </p>
                  <div class="list-group list-group-flush">
                    <li className="list-group-item list-group-item-secondary d-flex justify-content-between align-items-start">
                      <div class="ms-2 me-auto">
                        <em>You are scheduled as: </em>
                        <div class="fw-bold">{scheduledEvent.rTitle}</div>
                      </div>
                    </li>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default UserSignedUpRoles;
