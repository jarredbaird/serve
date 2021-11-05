import React, { useContext } from "react";
import { DataContext } from "../contexts/DataContext";

const ShowQualifiedRoles = () => {
  const { scheduledRoles } = useContext(DataContext);
  return (
    <div className="container">
      <h2 className="d-flex justify-content-center">
        all scheduled roles (filled and unfilled).
      </h2>
      <div className="row row-cols-1 row-cols-md-1 g-4">
        {scheduledRoles.map((scheduledRole) => {
          return (
            <div className="col">
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">{`${new Date(
                    scheduledRole.startTime
                  ).toDateString()} / ${scheduledRole.etName}`}</h5>
                  <p className="card-text">
                    Location: {scheduledRole.location}
                  </p>
                  <p className="card-text">
                    {scheduledRole.requiredRoles.map((requiredRole) => {
                      return (
                        <span
                          className="badge rounded-pill bg-secondary m-1"
                          style={{ fontSize: "1rem" }}>
                          {requiredRole.rTitle} /{" "}
                          <span style={{ fontSize: "0.75rem" }}>
                            {requiredRole.mName}
                          </span>
                          {requiredRole.uName ? (
                            <span className="badge rounded-pill bg-success mx-1">
                              {requiredRole.uName}
                            </span>
                          ) : (
                            <span className="badge rounded-pill bg-danger mx-1">
                              No volunteer
                            </span>
                          )}
                        </span>
                      );
                    })}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ShowQualifiedRoles;
