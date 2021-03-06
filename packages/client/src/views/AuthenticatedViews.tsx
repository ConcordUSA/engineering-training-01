import React from "react";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import { Route, Switch } from "react-router-dom";
import routes from "../constants/routes";
import EventDetailsView from "./EventDetails/EventDetails";
import EventDetailsFormView from "./EventDetailsForm";
import EventListView from "./EventList";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    },
  })
);

export default function App() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Switch>
        <Route exact path={routes.EVENT_LIST_URL} component={EventListView} />
        <Route
          exact
          path={routes.CREATE_EVENT_URL}
          component={EventDetailsFormView}
        />
        <Route
          exact
          path={routes.EVENT_DETAILS_URL}
          component={EventDetailsView}
        ></Route>
        <Route
          exact
          path={routes.EVENT_DETAILS_EDIT_URL}
          component={EventDetailsFormView}
        />
        <Route component={EventListView} />
      </Switch>
    </div>
  );
}
