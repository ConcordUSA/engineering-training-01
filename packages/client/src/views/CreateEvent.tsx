import React, { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import { TextField } from "@material-ui/core";

export default function CreateAccountView() {
  const [state, setState] = useState({
    topic: "",
    location: "",
    date: "",
    time: "",
    category: "",
    status: "",
    price: "",
    image: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const id = e.target.id;
    setState({
      ...state,
      [id]: value,
    });
  };

  const handleCreate = async () => {
    //NOT SURE ABOUT THIS
    // db.collection("events").doc(uid).set({
    //   topic: state.topic,
    //   location: state.location,
    //   date: state.date,
    //   category: state.category,
    //   status: state.status,
    //   price: state.price,
    //   image: state.image,
    //});
  };

  return (
    <div>
      <TextField
        id="eventTopic"
        label="Topic"
        value={state.topic}
        onChange={handleChange}
      />
      <br />
      <TextField
        id="eventLocation"
        label="Location"
        value={state.location}
        onChange={handleChange}
      />
      <br />
      <TextField
        id="date"
        value={state.date}
        onChange={handleChange}
        type="date"
      />
      <br />
      <TextField
        id="time"
        label="time"
        value={state.time}
        onChange={handleChange}
      />
      <br />
      <TextField
        id="category"
        label="Category"
        value={state.category}
        onChange={handleChange}
      />
      <br />
      <TextField
        id="status"
        label="Status"
        value={state.status}
        onChange={handleChange}
      />
      <br />
      <TextField
        id="price"
        label="Price"
        value={state.price}
        onChange={handleChange}
        type="number"
      />
      <br />
      <TextField
        id="image"
        label="Image"
        value={state.image}
        onChange={handleChange}
        type="image"
      />
      <br />
      <button id="createEventButton" onClick={handleCreate}>
        Create Event
      </button>
    </div>
  );
}
