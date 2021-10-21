import React, { useContext, useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { UserContext } from "../contexts/UserContext";

import "./AuthForm.css";

const SignInForm = () => {
  const { setToken } = useContext(UserContext);
  const history = useHistory();
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [formErrors, setFormErrors] = useState("");

  const handleChange = (evt) => {
    const { name, value } = evt.target;
    setFormData((item) => ({ ...item, [name]: value }));
  };

  const handleSubmit = async (evt) => {
    evt.preventDefault();
    try {
      let result = await axios.post(
        "http://127.0.0.1:3001/auth/get-token",
        formData
      );
      // let result = {
      //   data: formData,
      //   success: true,
      //   errors: ["now we have a problem"],
      // };

      if (result.data.token) {
        setToken(result.data.token);
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
      <h1 className="d-flex justify-content-center">signin.</h1>
      <h3 className="d-flex justify-content-center">we need you!</h3>
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
            <div className="mb-3 form-check">
              <input
                type="checkbox"
                className="form-check-input"
                id="remember"
                name="remember"
                onChange={handleChange}
              />
              <label className="form-check-label" htmlFor="exampleCheck1">
                Remember me
              </label>
            </div>
            <button
              type="submit"
              className="btn btn-primary"
              onSubmit={handleSubmit}>
              signin.
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignInForm;
