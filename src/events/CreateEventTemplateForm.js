import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import "../account/AuthForm.css";

const CreateEventTemplateForm = () => {
  const history = useHistory();
  const [formData, setFormData] = useState({});
  const [formErrors, setFormErrors] = useState("");
  const [ministries, setMinistries] = useState([]);
  const [roles, setRoles] = useState([]);

  useEffect(function loadMinistriesAndRoles() {
    async function getAllMinistriesAndRoles() {
      try {
        let allMinistries = await axios.get(
          `http://127.0.0.1:3001/ministries/`
        );
        setMinistries(
          allMinistries.data.map((ministry) => {
            return { ...ministry, selected: false };
          })
        );
        let allRoles = await axios.get(`http://127.0.0.1:3001/roles/`);
        setRoles(
          allRoles.data.map((role) => {
            return { ...role, shown: false, selected: false };
          })
        );
      } catch (e) {
        return <div>out of luck</div>;
      }
    }
    getAllMinistriesAndRoles();
  }, []);

  const showRole = (mId) => {
    setRoles(
      roles.map((role) => {
        if (role.mId == mId) {
          role.shown = !role.shown;
        }
        if (!role.shown) role.selected = false;
        return role;
      })
    );
  };

  const handleChange = (evt) => {
    const { name } = evt.target;
    const value = evt.target.value;
    if (name === "mName") {
      showRole(value);
      setMinistries(
        ministries.map((ministry) => {
          if (ministry.mId == value) {
            ministry.selected = !ministry.selected;
          }
          return ministry;
        })
      );
    } else if (name === "rTitle") {
      setRoles(
        roles.map((role) => {
          if (role.rId == value) {
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
      if (result.data) {
        history.push("/authed");
      } else {
        setFormErrors(result.errors);
      }
    } catch (e) {
      setFormErrors(e.response.data.error.message);
    }
  };

  return (
    <div className="p-3">
      {formErrors && formErrors.length ? (
        <div className="alert alert-primary" role="alert">
          {`${formErrors}`}
        </div>
      ) : null}
      <h1 className="d-flex justify-content-center">
        create new event template.
      </h1>
      <div className="card mx-auto m-3" style={{ width: "60rem" }}>
        <div className="card-body">
          <h4 className="d-flex justify-content-center">
            you are here to create an event which will likely happen again in
            the future.
          </h4>
          <h6>
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
                placeholder="servant@servants.com"
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
                placeholder="servant@servants.com"
                name="etDescr"
                onChange={handleChange}
              />
              <label htmlFor="etDescr">event template description.</label>
            </div>
            <span>which ministries are needed at this event?</span>
            <br />
            <div className="btn-group mb-3">
              {ministries.map((ministry) => {
                return (
                  <div key={ministry.mId}>
                    <input
                      type="checkbox"
                      className="btn-check"
                      name="mName"
                      id={`m${ministry.mId}`}
                      autocomplete="off"
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
            <span> which roles are needed at this event? </span>
            <br />
            {roles.map((role) => {
              if (role.shown)
                return (
                  <span key={role.rId}>
                    <input
                      type="checkbox"
                      className="btn-check"
                      name="rTitle"
                      id={`r${role.rId}`}
                      autocomplete="off"
                      checked={role.selected}
                      value={`${role.rId}`}
                      onChange={handleChange}></input>
                    <label
                      className="btn btn-outline-primary"
                      htmlFor={`r${role.rId}`}>
                      {role.rTitle}
                    </label>
                  </span>
                );
            })}
            <br />
            <button
              type="submit"
              className="btn btn-success"
              onSubmit={handleSubmit}>
              create event template.
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateEventTemplateForm;
