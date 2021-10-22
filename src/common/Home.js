import React from "react";
import CreateEventTemplateForm from "../events/CreateEventTemplateForm";
import ShowEventTemplates from "../events/ShowEventTemplates";

const Home = () => {
  return (
    <div className="row m-1">
      <div className="col-3 ">
        <ShowEventTemplates />
      </div>
      <div className="col-6">
        <CreateEventTemplateForm />
      </div>
      <div className="col-3">Some else thats helpful</div>
    </div>
  );
};

export default Home;
