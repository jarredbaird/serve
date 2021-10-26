import React, { useState, useContext } from "react";
import { useHistory, Link } from "react-router-dom";
import axios from "axios";
import "../account/AuthForm.css";
import { DataContext } from "../contexts/DataContext";
import ministriesAndRoles from "../common/MinistriesAndRoles";
import MinistriesAndRoles from "../common/MinistriesAndRoles";

const QualifyUserForm = () => {
  const history = useHistory();
  const [formData, setFormData] = useState({});
  const [formErrors, setFormErrors] = useState("");
  const { users, setUsers, ministries, setMinistries, roles, setRoles } =
    useContext(DataContext);
  const [selectedUser, setSelectedUser] = useState();

  const displayUsers = (uId, deSelect) => {
    if (deSelect) {
      setUsers(
        users.map((user) => {
          user.shown = true;
          user.selected = false;
          return user;
        })
      );
      setSelectedUser(null);
    } else {
      setUsers(
        users.map((user) => {
          if (user.uId === uId) {
            user.shown = true;
            user.selected = true;
          } else {
            user.shown = false;
            user.selected = false;
          }
          return user;
        })
      );
      setSelectedUser(uId);
    }
  };

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
      name === "rTitle" || name === "mName" || name === "username"
        ? parseInt(evt.target.value)
        : evt.target.value;
    if (name === "username") {
      displayUsers(
        value,
        users.some((user) => user.selected)
      );
    }
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
      let result = await axios.post(
        `http://127.0.0.1:3001/users/qualify/${selectedUser}`,
        selectedRoles
      );
      setRoles(
        roles.map((role) => {
          return { ...role, selected: false, shown: false };
        })
      );
      if (result.data) {
        let allUsers = await axios.get(`http://127.0.0.1:3001/users/`);
        setUsers(
          allUsers.data.map((user) => {
            return { ...user, selected: false, shown: true };
          })
        );
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
            <span>which user are we talkin' here?</span>
            <br />
            {users.map((user) => {
              if (user.shown)
                return (
                  <span key={`u${user.uId}`} className="m-1">
                    <input
                      type="checkbox"
                      className="btn-check"
                      name="username"
                      id={`u${user.uId}`}
                      autoComplete="off"
                      checked={user.selected}
                      value={`${user.uId}`}
                      onChange={handleChange}></input>
                    <label
                      className="btn btn-outline-primary"
                      htmlFor={`u${user.uId}`}>
                      {`${user.first} ${user.last}`}
                      <span style={{ fontSize: "0.7rem" }}>
                        {" "}
                        / {user.username}{" "}
                      </span>
                    </label>
                  </span>
                );
            })}
            <br />
            {selectedUser ? (
              <MinistriesAndRoles
                handleChange={handleChange}
                handleSubmit={handleSubmit}
                ministries={ministries}
                roles={roles}
              />
            ) : (
              ""
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

export default QualifyUserForm;
