import React, { useState } from "react";
import {
  List,
  ListItem,
  ListItemText,
  Collapse,
  makeStyles,
  createStyles,
  Theme,
} from "@material-ui/core";
import { ExpandLess, ExpandMore } from "@material-ui/icons";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {},
    container: {
      margin: "0px 5px 5px 0px",
      padding: "5px",
    },
    nested: {
      padding: 0,
      paddingLeft: theme.spacing(4),
      color: "grey",
    },
  })
);

export default function ListItemComponent(props) {
  const classes = useStyles();
  const [expand, setExpand] = useState(false);
  const handleExpand = () => {
    setExpand(!expand);
  };

  return (
    <div>
      <ListItem button={props.isAdmin} onClick={handleExpand}>
        <ListItemText
          primary={props.attendee.firstName + " " + props.attendee.lastName}
        />
        {props.isAdmin && (expand ? <ExpandLess /> : <ExpandMore />)}
      </ListItem>
      {props.isAdmin && (
        <Collapse in={expand}>
          <List component="div" disablePadding>
            <ListItem className={classes.nested}>
              <ListItemText primary={props.attendee.company} />
            </ListItem>
            <ListItem className={classes.nested}>
              <ListItemText primary={props.attendee.email} />
            </ListItem>
            <ListItem className={classes.nested}>
              <ListItemText primary={props.attendee.companyPhone} />
            </ListItem>
          </List>
        </Collapse>
      )}
    </div>
  );
}
