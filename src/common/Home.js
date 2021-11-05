import React from "react";
import CreateEventTemplateForm from "../events/CreateEventTemplateForm";
import ShowEventTemplates from "../events/ShowEventTemplates";
import ShowQualifiedRoles from "../roles/ShowQualifiedRoles.js";

const Home = () => {
  return (
    <div className="row m-1">
      <div className="col-3 ">
        <ShowEventTemplates />
      </div>
      <div className="col-6">
        <ShowQualifiedRoles />
      </div>
      <div className="col-3">Something else thats helpful</div>
    </div>
  );
};

export default Home;
