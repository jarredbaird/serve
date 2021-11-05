import React from "react";
import ShowScheduledEvents from "../events/ShowScheduledRoles.js";
import ShowEventTemplates from "../events/ShowEventTemplates";
import ShowUsers from "../users/ShowUsers";

const AdminHome = () => {
  return (
    <div className="row m-1">
      <div className="col-3 ">
        <ShowEventTemplates />
      </div>
      <div className="col-6">
        <ShowScheduledEvents />
      </div>
      <div className="col-3">
        <ShowUsers />
      </div>
    </div>
  );
};

export default AdminHome;
