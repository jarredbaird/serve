import React from "react";

const MinistriesAndRoles = ({
  handleChange,
  ministries,
  roles,
  handleSubmit,
}) => {
  return (
    <>
      {" "}
      <span>which ministries are they qualified for?</span>
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
      <span> which specific roles are they qualified for? </span>
      <br />
      {roles.map((role) => {
        if (role.shown)
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
                <span style={{ fontSize: "0.7rem" }}> / {role.mName} </span>
              </label>
            </span>
          );
      })}
      <br />
      <br />
      <button type="submit" className="btn btn-success" onSubmit={handleSubmit}>
        certify! 🎉.
      </button>
    </>
  );
};

export default MinistriesAndRoles;
