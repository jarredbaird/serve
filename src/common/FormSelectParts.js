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
  const handleChange = (evt) => {
    const { value } = evt.target;
    value = parseInt(value) ? parseInt(value) : value;
    if (multiSelect) {
      const newSelected = selected[name]
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
        const id =
          option[
            Object.keys(option).filter((key) => {
              return key.includes("Id");
            })
          ];
        if (shown[name] && shown[name].includes(option[id])) {
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
