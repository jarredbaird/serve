import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../contexts/UserContext";
import UserSignedUpRoles from "../users/UserSignedUpRoles";

const BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:3001";

const ShowQualifiedRoles = () => {
  const { currentUser } = useContext(UserContext);
  const [
    currentUserScheduledQualifiedRoles,
    setCurrentUserScheduledQualifiedRoles,
  ] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    const getScheduledQualifiedRoles = async () => {
      const results = await axios.get(
        `${BASE_URL}/schedule-user/${currentUser.uId}`
      );
      setCurrentUserScheduledQualifiedRoles(results.data);
    };
    getScheduledQualifiedRoles();
    setLoading(false);
  }, [loading]);

  const signup = async (scheduledEventId, requiredRoleId, userId) => {
    const results = await axios.post(`${BASE_URL}/scheduled-users/`, {
      seId: scheduledEventId,
      etrrId: requiredRoleId,
      uId: userId,
    });
    console.debug(results.data);
    setLoading(true);
  };

  const unsignup = async (scheduledEventId, requiredRoleId, userId) => {
    const results = await axios.delete(`${BASE_URL}/scheduled-users/`, {
      data: {
        seId: scheduledEventId,
        etrrId: requiredRoleId,
        uId: userId,
      },
    });
    console.debug(results.data);
    setLoading(true);
  };

  console.debug("currentUser: ", currentUser);
  console.debug(
    "currentUserScheduledQualifiedRoles",
    currentUserScheduledQualifiedRoles
  );

  if (loading)
    return (
      <div>Still getting the scheduled roles you are qualified for....</div>
    );

  return (
    <>
      <div className="col-6">
        <div className="container">
          <h2 className="d-flex justify-content-center">
            all scheduled roles you are qualified for.
          </h2>
          <div className="row row-cols-1 row-cols-md-1 g-4">
            {currentUserScheduledQualifiedRoles.map((scheduledEvent) => {
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
                        {scheduledEvent.requiredRoles.map((requiredRole) => {
                          return (
                            <>
                              <li className="list-group-item d-flex justify-content-between align-items-start">
                                <div class="ms-2 me-auto">
                                  <div class="fw-bold">
                                    {requiredRole.rTitle}
                                  </div>
                                  <em>Current Volunteer: </em>
                                  {requiredRole.uIdScheduled
                                    ? requiredRole.uNameScheduled +
                                      `${
                                        currentUser.uId ===
                                        requiredRole.uIdScheduled
                                          ? "✅"
                                          : "✔️"
                                      }`
                                    : "no one yet ❌"}
                                </div>
                                <div className="btn-group align-self-end">
                                  {currentUser.uId ===
                                  requiredRole.uIdScheduled ? (
                                    <button
                                      className="btn btn-danger"
                                      onClick={() => {
                                        unsignup(
                                          scheduledEvent.seId,
                                          requiredRole.etrrId,
                                          currentUser.uId
                                        );
                                      }}>
                                      unsignup
                                    </button>
                                  ) : requiredRole.uIdScheduled ? (
                                    <button
                                      className="btn btn-primary"
                                      disabled>
                                      taken
                                    </button>
                                  ) : (
                                    <button
                                      className="btn btn-primary"
                                      onClick={() => {
                                        signup(
                                          scheduledEvent.seId,
                                          requiredRole.etrrId,
                                          currentUser.uId
                                        );
                                      }}>
                                      sign up
                                    </button>
                                  )}
                                </div>
                              </li>
                            </>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      <div className="col-3">
        <UserSignedUpRoles loading={loading} setLoading={setLoading} />
      </div>
    </>
  );
};

export default ShowQualifiedRoles;
