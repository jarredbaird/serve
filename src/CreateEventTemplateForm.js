import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import "./AuthForm.css";

const CreateEventTemplateForm = () => {
  const history = useHistory();
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [formErrors, setFormErrors] = useState("");
  const [ministries, setMinistries] = useState([]);

  useEffect(function loadMinistries() {
    async function getAllMinistries() {
      try {
        let allMinistries = await axios.get(
          `http://127.0.0.1:3001/ministries/`
        );
        setMinistries(allMinistries);
      } catch (e) {
        history.push("/");
      }
    }
    getAllMinistries();
  }, []);

  debugger;
  const handleChange = (evt) => {
    const { name, value } = evt.target;
    setFormData((item) => ({ ...item, [name]: value }));
  };

  const handleSubmit = async (evt) => {
    evt.preventDefault();
    try {
      let result = await axios.post(
        "http://127.0.0.1:3001/event-templates/",
        formData
      );

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
        <div class="alert alert-primary" role="alert">
          {`${formErrors}`}
        </div>
      ) : null}
      <h1 className="d-flex justify-content-center">
        create new event template.
      </h1>
      <h3 className="d-flex justify-content-center">
        (e.g. kid's church every sunday, worship practice/serve every sunday,
        etc)
      </h3>
      <div className="card mx-auto m-3" style={{ width: "21rem" }}>
        <div className="card-body">
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="etName" className="form-label">
                event template name.
              </label>
              <input
                type="text"
                className="form-control"
                autoComplete="off"
                id="etName"
                name="etName"
                aria-describedby="etName"
                onChange={handleChange}
              />
              <div id="nameIdeas" className="form-text">
                try to make the name as pretty and, yet, unique as you can.
                something that your users will be able to identify
              </div>
            </div>
            <div className="mb-3">
              <label htmlFor="etDescr" className="form-label">
                event template description.
              </label>
              <input
                type="text"
                autoComplete="off"
                className="form-control"
                id="etDescr"
                name="erDescr"
                onChange={handleChange}
              />
            </div>
            <label htmlFor="ministry" className="form-label">
              which ministry does this event template belong to?
            </label>
            <select class="form-select" aria-label="Default select example">
              <option selected>Open this select menu</option>
              {/* {ministries.map((ministry) => {
                return <option value={ministry.mId}>{ministry}</option>;
              })} */}
            </select>
            <button
              type="submit"
              className="btn btn-primary"
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
