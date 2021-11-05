import React, { useState, useContext } from "react";
import { useHistory, Link } from "react-router-dom";
import axios from "axios";
import "../account/AuthForm.css";
import { DataContext } from "../contexts/DataContext";
import FormSelectParts from "../common/FormSelectParts";

const CreateEventTemplateForm = () => {
  const history = useHistory();
  const [formData, setFormData] = useState({});
  const { ministries, roles, setRoles, eventTemplates, setEventTemplates } =
    useContext(DataContext);
  const initialMinistries = ministries.map((ministry) => ministry.mId);

  const [formErrors, setFormErrors] = useState("");
  const [selected, setSelected] = useState({
    ministries: [],
    roles: [],
  });

  const [shown, setShown] = useState({
    ministries: initialMinistries,
    roles: [],
  });

  const handleChange = (evt) => {
    const { name } = evt.target;
    const value = evt.target.value;
    setFormData((item) => ({ ...item, [name]: value }));
  };

  const handleSubmit = async (evt) => {
    evt.preventDefault();
    const selectedRoles = selected.roles;
    debugger;
    try {
      let result = await axios.post("http://127.0.0.1:3001/event-templates/", {
        ...formData,
        selectedRoles,
      });
      setRoles(
        roles.map((role) => {
          return { ...role, selected: false, shown: false };
        })
      );
      if (result.data) {
        setEventTemplates([...eventTemplates, result.data]);
        history.push("/home");
      } else {
        setFormErrors(result.errors);
      }
    } catch (e) {
      setFormErrors(e.response.data.error.message);
    }
  };

  return (
    <div>
      {formErrors && formErrors.length ? (
        <div className="alert alert-primary" role="alert">
          {`${formErrors}`}
        </div>
      ) : null}
      <h1 className="d-flex justify-content-center">
        create new event template.
      </h1>
      <div className="card mx-auto m-3" style={{ width: "50rem" }}>
        <div className="card-body">
          <h4 className="d-flex justify-content-center">
            you are here to create an event which will likely happen again in
            the future.
          </h4>
          <h6 className="d-flex justify-content-center">
            (e.g. kid's church every sunday, worship practice/serve every
            sunday, etc)
          </h6>
          <form onSubmit={handleSubmit}>
            <span>What do you want to name the event?</span>
            <div className="form-floating mb-3">
              <input
                type="text"
                className="form-control"
                autoComplete="off"
                id="etName"
                name="etName"
                aria-describedby="etName"
                placeholder="God Event"
                onChange={handleChange}
              />
              <label htmlFor="etName">event template name.</label>
            </div>
            <span>Describe it. Be sure to include all the details</span>
            <div className="form-floating mb-3">
              <textarea
                type="text"
                autoComplete="off"
                className="form-control"
                id="etDescr"
                placeholder="The Godliest Event Ever!"
                name="etDescr"
                onChange={handleChange}
              />
              <label htmlFor="etDescr">event template description.</label>
            </div>

            <FormSelectParts
              multiSelect={true}
              label="which ministries are they qualified for?"
              name="ministries"
              options={ministries}
              selected={selected}
              sideEffect={{ name: "roles", options: roles, id: "rId" }}
              keyToReveal="mId"
              setSelected={setSelected}
              shown={shown}
              setShown={setShown}
            />

            {/* If one or more ministries have been selected, then display the roles */}
            {selected.ministries.length ? (
              <FormSelectParts
                multiSelect={true}
                label="which role(s) are they qualified for?"
                name="roles"
                options={roles}
                selected={selected}
                setSelected={setSelected}
                shown={shown}
                setShown={setShown}
              />
            ) : null}
            {selected.roles.length ? (
              <button
                type="submit"
                className="btn btn-success"
                onSubmit={handleSubmit}>
                create event template! 🎉
              </button>
            ) : (
              <button
                type="submit"
                className="btn btn-success"
                disabled
                onSubmit={handleSubmit}>
                select roles first...
              </button>
            )}
            <Link to="/home">
              <button type="submit" className="btn btn-info m-1">
                cancel.
              </button>
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateEventTemplateForm;
