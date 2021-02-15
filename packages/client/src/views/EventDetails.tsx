import React from "react";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import {
  Card,
  CardActionArea,
  CardActions,
  Button,
  CardContent,
  CardMedia,
  Typography,
  Box,
} from "@material-ui/core";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: "flex",
      flexWrap: "wrap",
      justifyContent: "center",
      marginTop: "12%",
      height: "100%",
      width: "100%",
    },
    card: {
      width: "50%",
    },
    infoType: {
      fontSize: "1.2em",
      marginTop: "10px",
    },
    eventData: {
      marginTop: "20px",
    },
    interestTag: {
      width: "25%",
      height: "1%",
      textAlign: "center",
      padding: "0px",
      borderRadius: "5px",
      color: "white",
      display: "inline-block",
      margin: "1px",
      float: "left",
    },
    eventDescription: {
      marginTop: "10px",
    },
    eventTitle: {
      fontSize: "20pt",
      fontWeight: "bold",
      marginBottom: "10px",
    },
    tags: {},
  })
);

export default function EventDetailsView() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Card className={classes.card}>
        <CardActionArea>
          <CardMedia
            component="img"
            alt="Contemplative Reptile"
            height="300px"
            image="https://www.doi.gov/sites/doi.gov/files/blog-post/thumbnail-images/ZionNPTomMorrisSmall.jpg"
            title="Contemplative Reptile"
          />
          <CardContent>
            <Typography className={classes.eventTitle}>
              Canyons in the Workplace
            </Typography>
            <div className={classes.tags}>
              <Box
                bgcolor="success.main"
                color="success.contrastText"
                p={1}
                className={classes.interestTag}
              >
                Marketing
              </Box>
              <Box
                bgcolor="info.main"
                color="info.contrastText"
                p={1}
                className={classes.interestTag}
              >
                Leadership
              </Box>{" "}
              <br />
            </div>
            <Typography className={classes.eventDescription}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec leo
              tortor, accumsan a risus eget, rhoncus sollicitudin orci. Morbi et
              magna sed lacus finibus rutrum. In elementum, erat in ultrices
              tempor, mauris elit molestie mauris, in convallis erat nisi in
              est. Maecenas justo lorem, commodo ac felis ac, consectetur
              tincidunt orci. Pellentesque ornare augue lectus. Vivamus a dolor
              vel nibh suscipit imperdiet. Pellentesque habitant morbi tristique
              senectus et netus et malesuada fames ac turpis egestas. Phasellus
              augue turpis, dignissim id elit id, ornare accumsan mi. Curabitur
              id sagittis libero, ut pellentesque urna. Sed sodales nibh non
              fermentum ultrices. Curabitur pretium magna orci, non luctus justo
              fermentum vel. Aliquam eu ex vel mauris viverra rutrum. Ut varius
              lorem tristique metus sollicitudin, quis ornare libero
              sollicitudin. Phasellus aliquet, turpis vitae mattis pretium,
              lacus tortor malesuada neque, sed fermentum nulla elit quis est.
            </Typography>

            <Typography className={classes.eventData}>
              <Typography paragraph className={classes.infoType}>
                <b>Address:</b> 1 Zion Park Blvd State Route 9, Springdale, UT
              </Typography>
              <Typography paragraph className={classes.infoType}>
                <b>Time:</b> 12:30 pm
              </Typography>
              <Typography paragraph className={classes.infoType}>
                <b>Cost:</b> $100
              </Typography>
              <Typography paragraph className={classes.infoType}>
                <b>Status:</b> Active
              </Typography>
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions>
          <Button variant="contained">Edit</Button>
          <Button variant="contained">WatchList</Button>
          <Button variant="contained" color="secondary">
            Register
          </Button>
          <br />
        </CardActions>
      </Card>
    </div>
  );
}
