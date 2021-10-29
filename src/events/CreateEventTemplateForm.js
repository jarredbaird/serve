import React, { useState, useContext } from "react";
import { useHistory, Link } from "react-router-dom";
import axios from "axios";
import "../account/AuthForm.css";
import { DataContext } from "../contexts/DataContext";

const CreateEventTemplateForm = () => {
  const history = useHistory();
  const [formData, setFormData] = useState({});
  const [formErrors, setFormErrors] = useState("");
  const {
    ministries,
    setMinistries,
    roles,
    setRoles,
    eventTemplates,
    setEventTemplates,
  } = useContext(DataContext);

  const showRole = (mId) => {
    setRoles(
      roles.map((role) => {
        if (role.mId === mId) {
          role.shown = !role.shown;
        }
        if (!role.shown) role.selected = false;
        return role;
      })
    );
  };

  const handleChange = (evt) => {
    const { name } = evt.target;
    const value =
      name === "rTitle" || name === "mName"
        ? parseInt(evt.target.value)
        : evt.target.value;
    if (name === "mName") {
      showRole(value);
      setMinistries(
        ministries.map((ministry) => {
          if (ministry.mId === value) {
            ministry.selected = !ministry.selected;
          }
          return ministry;
        })
      );
    } else if (name === "rTitle") {
      setRoles(
        roles.map((role) => {
          if (role.rId === value) {
            role.selected = !role.selected;
          }
          return role;
        })
      );
    } else {
      setFormData((item) => ({ ...item, [name]: value }));
    }
  };

  const handleSubmit = async (evt) => {
    evt.preventDefault();
    const selectedRoles = roles.filter((role) => {
      return role.selected;
    });
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
            <span>which ministries are needed at this event?</span>
            <br />
            <div className="btn-group">
              {ministries.map((ministry) => {
                return (
                  <div key={ministry.mId} className="m-1">
                    <input
                      type="checkbox"
                      className="btn-check"
                      name="mName"
                      id={`m${ministry.mId}`}
                      autoComplete="off"
                      checked={ministry.selected}
                      value={`${ministry.mId}`}
                      onChange={handleChange}></input>
                    <label
                      className="btn btn-outline-primary"
                      htmlFor={`m${ministry.mId}`}>
                      {ministry.mName}
                    </label>
                  </div>
                );
              })}
            </div>
            <br />
            <br />
            <span> which roles are needed at this event? </span>
            <br />
            {roles.map((role) => {
              if (role.shown) {
                return (
                  <span key={role.rId} className="m-1">
                    <input
                      type="checkbox"
                      className="btn-check"
                      name="rTitle"
                      id={`r${role.rId}`}
                      autoComplete="off"
                      checked={role.selected}
                      value={`${role.rId}`}
                      onChange={handleChange}></input>
                    <label
                      className="btn btn-outline-primary"
                      htmlFor={`r${role.rId}`}>
                      {role.rTitle}
                      <span style={{ fontSize: "0.7rem" }}>
                        {" "}
                        / {role.mName}{" "}
                      </span>
                    </label>
                  </span>
                );
              } else {
                return 0;
              }
            })}
            <br />
            <br />
            <button
              type="submit"
              className="btn btn-success"
              onSubmit={handleSubmit}>
              create event template.
            </button>
            <Link to="/authed">
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
