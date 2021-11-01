import React, { useState, useContext } from "react";
import { useHistory, Link } from "react-router-dom";
import axios from "axios";
import "../account/AuthForm.css";
import { DataContext } from "../contexts/DataContext";
import FormSelectParts from "../common/FormSelectParts";

const QualifyUserFormModule = () => {
  const { users, ministries, roles, setRoles, loading } =
    useContext(DataContext);
  const initialUsers = users.map((user) => user.uId);
  const initialMinistries = ministries.map((ministry) => ministry.mId);
  console.debug(initialMinistries);
  const history = useHistory();
  const [formErrors, setFormErrors] = useState("");
  const [selected, setSelected] = useState({
    users: [],
    ministries: [],
    roles: [],
  });

  const [shown, setShown] = useState({
    users: initialUsers,
    ministries: initialMinistries,
    roles: [],
  });

  const handleSubmit = async (evt) => {
    evt.preventDefault();
    try {
      let result = await axios.post(
        `http://127.0.0.1:3001/users/qualify/${selected.user}`,
        selected.roles
      );
      setRoles(
        roles.map((role) => {
          return { ...role, selected: false, shown: false };
        })
      );
      if (result.data) {
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
        certify a volunteer for roles.
      </h1>
      <div className="card mx-auto m-3" style={{ width: "50rem" }}>
        <div className="card-body">
          <h4 className="d-flex justify-content-center">
            you are here to release a volunteer to serve in a particular role.
          </h4>
          <h6 className="d-flex justify-content-center">
            (e.g. maxwell has been trained and can now work the espresso
            machine. you would add the "barista master" role to his profile)
          </h6>
          <form onSubmit={handleSubmit}>
            {/* Show the users first... */}
            <FormSelectParts
              multiSelect={false}
              label="which user are we talkin' about?"
              name="users"
              options={users}
              selected={selected}
              setSelected={setSelected}
              shown={shown}
              setShown={setShown}
            />
            {/* If a user has been selected, then display the ministries */}

            {selected.users.length ? (
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
            ) : null}

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
                certify! 🎉.
              </button>
            ) : (
              <button
                type="submit"
                className="btn btn-success"
                disabled
                onSubmit={handleSubmit}>
                certify! 🎉.
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

export default QualifyUserFormModule;
