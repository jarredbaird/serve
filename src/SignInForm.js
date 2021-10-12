import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import "./AuthForm.css";

const SignInForm = () => {
  const history = useHistory();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [formErrors, setFormErrors] = useState([]);

  const handleChange = (evt) => {
    const { name, value } = evt.target;
    setFormData((item) => ({ ...item, [name]: value }));
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();
    let result = {
      data: formData,
      success: true,
      errors: ["now we have a problem"],
    };
    debugger;
    if (result.success) {
      history.push("/authed");
    } else {
      setFormErrors(result.errors);
    }
  };

  return (
    <div className="p-3">
      {formErrors.length ? (
        <div class="alert alert-primary" role="alert">
          {`fix yo'self...${formErrors}`}
        </div>
      ) : null}
      <h1 className="d-flex justify-content-center">signin.</h1>
      <h3 className="d-flex justify-content-center">we need you!</h3>
      <div className="card mx-auto m-3" style={{ width: "21rem" }}>
        <div className="card-body">
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">
                Email address
              </label>
              <input
                type="email"
                className="form-control"
                autoComplete="username"
                id="email"
                name="email"
                aria-describedby="emailHelp"
              />
              <div id="establishTrust" className="form-text">
                We'll never share your email with anyone else.
              </div>
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label">
                Password
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
