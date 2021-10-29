import React from "react";

/* FormSelectParts helps to streamline form creation when using  */

const FormSelectParts = ({
  multiSelect,
  label,
  name,
  options,
  selected,
  setSelected,
  shown,
  setShown,
  displayRoles,
}) => {
  console.debug(shown);
  const handleChange = (evt) => {
    const value = parseInt(evt.target.value)
      ? parseInt(evt.target.value)
      : evt.target.value;
    if (multiSelect) {
      let newSelected = selected[name]
        ? [...selected[name]]
        : (selected[name] = []);
      if (!newSelected.includes(value)) {
        newSelected = newSelected.filter((itemToRemove) => {
          return itemToRemove !== value;
        });
      } else {
        newSelected.push(value);
      }
      selected[name] = [...newSelected];
      setSelected({ ...selected });
    } else {
      if (Array.isArray(shown[name])) {
        selected[name] = value;
        shown[name] = value;
        setSelected({ ...selected });
        setShown({ ...shown });
      } else {
        selected[name] = null;
        shown[name] = options.map((option) => {
          const id = Object.keys(option).filter((key) => {
            return key.includes("Id");
          });
          return option[id];
        });
        setSelected({ ...selected });
        setShown({ ...shown });
      }
    }
    displayRoles(evt);
  };

  return (
    <>
      <br />
      <span id={"label" + name}>{label}</span>
      {options.map((option) => {
        console.debug(
          "**3** users array (FormSelectParts) is: ",
          options,
          "shown is: ",
          shown
        );
        debugger;
        const idKey = Object.keys(option).filter((key) => {
          return key.includes("Id");
        });
        const nameKey = Object.keys(option).filter((key) => {
          return key.includes("name") || key.includes("title");
        });
        const id = option[idKey];
        const text = option[nameKey];
        if (shown[name] && shown[name].includes(id)) {
          return (
            <span key={name + id}>
              <input
                type="checkbox"
                className="btn-check"
                name={name}
                id={name + id}
                autoComplete="off"
                checked={
                  selected[name] && selected[name].includes(option[id])
                    ? true
                    : false
                }
                value={id}
                onChange={handleChange}
              />
              <label className="btn btn-outline-primary" htmlFor={name + id}>
                {text}
              </label>
            </span>
          );
        }
        return null;
      })}
      <br />
    </>
  );
};

export default FormSelectParts;
