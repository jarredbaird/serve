import React, { useContext } from "react";
import { DataContext } from "../contexts/DataContext";

const ShowEventTemplates = () => {
  const { eventTemplates } = useContext(DataContext);
  return (
    <div className="container">
      <h2 className="d-flex justify-content-center">all event templates.</h2>
      <div className="row row-cols-1 row-cols-md-1 g-4">
        {eventTemplates.map((eventTemplate) => {
          return (
            <div className="col">
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">{eventTemplate.etName}</h5>
                  <p className="card-text">{eventTemplate.etDescr}</p>
                  <p className="card-text">
                    {eventTemplate.requiredRoles.map((requiredRole) => {
                      return (
                        <span className="badge rounded-pill bg-primary mx-1">
                          {requiredRole.rTitle}
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

export default ShowEventTemplates;
