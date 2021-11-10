import React, { useContext, useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { UserContext } from "../contexts/UserContext";

import "./AuthForm.css";

const BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:3001";

const SignUpForm = () => {
  const { currentUser, setToken } = useContext(UserContext);
  const history = useHistory();
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [formErrors, setFormErrors] = useState("");

  if (currentUser) {
    history.push("/home");
  }

  const handleChange = (evt) => {
    const { name, value } = evt.target;
    setFormData((item) => ({ ...item, [name]: value }));
  };

  const handleSubmit = async (evt) => {
    evt.preventDefault();
    try {
      let result = await axios.post(`${BASE_URL}/users/`, formData);
      // let result = {
      //   data: formData,
      //   success: true,
      //   errors: ["now we have a problem"],
      // };

      if (result.data.token) {
        setToken(result.data.token);
        history.push("/home");
      } else {
        setFormErrors(result.errors);
      }
    } catch (e) {
      setFormErrors(e.response.data.error.message);
    }
  };

  return (
    <div className="container p-3">
      {formErrors && formErrors.length ? (
        <div className="alert alert-primary" role="alert">
          {`${formErrors}`}
        </div>
      ) : null}
      <h1 className="d-flex justify-content-center">signup.</h1>
      <h3 className="d-flex justify-content-center">help us out!</h3>
      <div className="card mx-auto m-3" style={{ width: "21rem" }}>
        <div className="card-body">
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="username" className="form-label">
                email address.
              </label>
              <input
                type="email"
                className="form-control"
                autoComplete="username"
                id="username"
                name="username"
                aria-describedby="emailHelp"
                onChange={handleChange}
              />
              <div id="establishTrust" className="form-text">
                We'll never share your email with anyone else.
              </div>
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label">
                password.
              </label>
              <input
                type="password"
                autoComplete="current-password"
                className="form-control"
                id="password"
                name="password"
                onChange={handleChange}
              />
            </div>
            <label htmlFor="first" className="form-label">
              first name.
            </label>
            <input
              type="text"
              className="form-control"
              autoComplete="username"
              id="first"
              name="first"
              aria-describedby="first"
              onChange={handleChange}
            />
            <label htmlFor="last" className="form-label">
              last name.
            </label>
            <input
              type="text"
              className="form-control"
              autoComplete="family-name"
              id="last"
              name="last"
              aria-describedby="last"
              onChange={handleChange}
            />
            <div className="mb-3 form-check">
              <input
                type="checkbox"
                className="form-check-input"
                id="remember"
                name="remember"
                onChange={handleChange}
              />
              <label className="form-check-label" htmlFor="exampleCheck1">
                remember me.
              </label>
            </div>
            <button
              type="submit"
              className="btn btn-primary"
              onSubmit={handleSubmit}>
              signup.
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUpForm;
