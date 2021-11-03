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
  sideEffect = null,
  keyToReveal = null,
}) => {
  const handleChange = (evt) => {
    const value = parseInt(evt.target.value)
      ? parseInt(evt.target.value)
      : evt.target.value;
    if (multiSelect) {
      let newSelected = [...selected[name]];
      if (newSelected.includes(value)) {
        newSelected = newSelected.filter((itemToRemove) => {
          return itemToRemove !== value;
        });
      } else {
        newSelected.push(value);
      }
      selected[name] = [...newSelected];
      setSelected({ ...selected });
    } else {
      // single select
      if (shown[name].length > 1) {
        selected[name] = [value];
        shown[name] = [value];
        setSelected({ ...selected });
        setShown({ ...shown });
      } else {
        selected[name] = [];
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
    if (sideEffect) {
      const toShow = [];
      for (let option of sideEffect.options) {
        if (selected[name] && selected[name].includes(option[keyToReveal])) {
          toShow.push(option[sideEffect.id]);
        }
      }
      shown[sideEffect.name] = [...toShow];
      setShown({ ...shown });
    }
  };

  return (
    <>
      <br />
      <span id={"label" + name}>{label}</span>
      <br />
      {options.map((option) => {
        let idKey;
        let nameKey;
        switch (name) {
          case "roles":
            idKey = "rId";
            nameKey = "rTitle";
            break;
          case "users":
            idKey = "uId";
            nameKey = "first";
            break;
          case "ministries":
            idKey = "mId";
            nameKey = "mName";
            break;
          default:
            console.log("something is wrong");
        }

        // if (nameKey === "rTitle") debugger;
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
                  selected[name] && selected[name].includes(id) ? true : false
                }
                value={id}
                onChange={handleChange}
              />
              <label className="btn btn-outline-primary" htmlFor={name + id}>
                {name === "roles" ? (
                  <span style={{ fontSize: "0.7rem" }}>{option.mName} / </span>
                ) : null}
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
