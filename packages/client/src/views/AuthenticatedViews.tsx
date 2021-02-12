import React, { useEffect, useContext } from "react";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import { Route, Switch } from "react-router-dom";
import routes from "../constants/routes";
import EventDetailsView from "./EventDetails";
import CreateEventView from "./CreateEvent";
import EventListView from "./EventList";
import InterestsView from "./Interests";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
      display: "flex",
      height: "100vh",
      justifyContent: "center",
      alignItems: "center",
      overflow: "scroll",
    },
  })
);

export default function App() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Switch>
        <Route exact path={routes.HOME_URL} component={EventListView} />
        <Route exact path={routes.INTERESTS_URL} component={InterestsView} />
        <Route
          exact
          path={routes.CREATE_EVENT_URL}
          component={CreateEventView}
        />
        <Route
          exact
          path={routes.EVENT_DETAILS_URL}
          component={EventDetailsView}
        ></Route>
      </Switch>
    </div>
  );
}
