import React, { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import { TextField } from "@material-ui/core";
import { EventFactory } from "../models/event";
import { AppDependencies, AppDependenciesContext } from "../appDependencies";
import EventsService from "../services/eventsService";
import routes from "../constants/routes";

export default function CreateAccountView() {
  const newEvent = EventFactory();
  const [state, setState] = useState(newEvent);
  const history = useHistory();
  const { db }: AppDependencies = useContext(AppDependenciesContext);
  const eventsService = new EventsService(db);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const id = e.target.id;
    setState({
      ...state,
      [id]: value,
    });
  };

  const handleCreate = async () => {
    try {
      await eventsService.createEvent(state);
      // TODO: What do we do after the event is created???
      console.log("successfully created an event"); // TODO: Handle system messages
      history.push(routes.HOME_URL);
    } catch (error) {
      console.log("error", error); //TODO: Handle system messages
    }
  };

  return (
    <div>
      <TextField
        id="topic"
        label="Topic"
        value={state.topic}
        onChange={handleChange}
      />
      <br />
      <TextField
        id="location"
        label="Location"
        value={state.location}
        onChange={handleChange}
      />
      <br />
      {/* TODO: Use a date field, or something that returns a date */}
      {/* <TextField
        id="startTime"
        value={state.startTime}
        onChange={handleChange}
        type="date"
      /> */}
      <br />
      <br />
      {/* <TextField
        id="categories"
        label="Category"
        value={state.categories}
        onChange={handleChange}
      /> */}
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
      />
      <br />
      <button id="createEventButton" onClick={handleCreate}>
        Create Event
      </button>
    </div>
  );
}
