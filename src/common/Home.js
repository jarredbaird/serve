import React from "react";
import ShowEventTemplates from "../events/ShowEventTemplates";
import ShowQualifiedRoles from "../roles/ShowQualifiedRoles.js";
import UserSignedUpRoles from "../users/UserSignedUpRoles";

const Home = () => {
  return (
    <div className="row m-1">
      <div className="col-3 ">
        <ShowEventTemplates />
      </div>
      <ShowQualifiedRoles />
    </div>
  );
};

export default Home;
