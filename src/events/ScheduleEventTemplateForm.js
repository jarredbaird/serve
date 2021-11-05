import React, { useState, useContext } from "react";
import { useHistory } from "react-router";
import axios from "axios";
import DatePicker from "react-datepicker";
import { DataContext } from "../contexts/DataContext";
import "react-datepicker/dist/react-datepicker.css";

const ScheduleEventTemplateForm = () => {
  const history = useHistory();
  const { eventTemplates } = useContext(DataContext);
  const [formErrors, setFormErrors] = useState("");
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [formData, setFormData] = useState("");

  const handleChange = (evt) => {
    const { name, value } = evt.target;
    setFormData((formData) => ({
      ...formData,
      [name]: value,
    }));
  };

  const handleSubmit = async (evt) => {
    evt.preventDefault();
    try {
      let result = await axios.post("http://127.0.0.1:3001/scheduled-events/", {
        etId: parseInt(formData.etId),
        location: formData.location,
        startTime: startDate,
        endTime: endDate,
      });
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
        schedule an event template.
      </h1>
      <div className="card mx-auto m-3" style={{ width: "50rem" }}>
        <div className="card-body">
          <h4 className="d-flex justify-content-center">
            you are here to schedule an event for which you have already created
            a template.
          </h4>
          {/* <h6 className="d-flex justify-content-center">
            (i.e. event name, description, required volunteer roles)
          </h6> */}
          <form onSubmit={handleSubmit}>
            <label className="form-label" htmlFor="eventTemplates">
              pick the event you would like to schedule.
            </label>
            <br />
            <select
              className="form-select form-select-lg mb-3"
              value={formData["etId"]}
              name="etId"
              onChange={handleChange}>
              {eventTemplates.map((eventTemplate) => {
                return (
                  <option
                    key={eventTemplate.etId}
                    value={`${eventTemplate.etId}`}>
                    {eventTemplate.etName}
                  </option>
                );
              })}
            </select>
            <span>where will this event be happening?</span>
            <div className="form-floating mb-3">
              <input
                type="text"
                className="form-control"
                autoComplete="off"
                id="location"
                name="location"
                aria-describedby="location"
                placeholder="best location"
                onChange={handleChange}
              />
              <label htmlFor="location">event location.</label>
            </div>
            <div className="row">
              <div className="col">
                <label className="form-label" htmlFor="startDate">
                  pick a start time for the event.
                </label>
                <DatePicker
                  selected={startDate}
                  onChange={(date) => setStartDate(date)}
                  selectsStart
                  name="startDate"
                  id="startDate"
                  showTimeSelect
                  startDate={startDate}
                  endDate={endDate}
                  dateFormat="MMMM d, yyyy h:mm aa"
                />
              </div>
              <div className="col">
                <label className="form-label" htmlFor="endDate">
                  pick an end time for the event.
                </label>
                <DatePicker
                  selected={endDate}
                  onChange={(date) => setEndDate(date)}
                  selectsEnd
                  name="endDate"
                  id="endDate"
                  showTimeSelect
                  startDate={startDate}
                  endDate={endDate}
                  minDate={startDate}
                  dateFormat="MMMM d, yyyy h:mm aa"
                />
              </div>
            </div>
            <br />
            <button
              type="submit"
              className="btn btn-success"
              onSubmit={handleSubmit}>
              schedule event! 🗓.
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ScheduleEventTemplateForm;
