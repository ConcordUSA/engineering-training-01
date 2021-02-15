import React, { useContext, useEffect, useMemo, useState } from "react";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import InterestsView from "./Interests";
import { AppDependencies, AppDependenciesContext } from "../appDependencies";
import routes from "../constants/routes";
import getConfig from "../config";
import UsersService from "../services/usersService";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: "flex",
      flexWrap: "wrap",
      justifyContent: "center",
      height: "90%",
    },
  })
);
export default function EmailVerificationView() {
  const classes = useStyles();
  const config = getConfig();
  const [hasPreferences, setHasPreferences] = useState(false);

  const { auth, db }: AppDependencies = useContext(AppDependenciesContext);
  const usersService = useMemo(() => new UsersService(db, auth), [db, auth]);

  useEffect(() => {
    if (auth.currentUser) {
      const uid = auth.currentUser.uid;
      usersService.getUser(uid).then((user) => {
        // set local view state
        const hasPreferences = user.interestedCategories.length > 0;
        setHasPreferences(hasPreferences);

        // send email verification
        if (!auth.currentUser.emailVerified)
          auth.currentUser
            ?.sendEmailVerification({
              url: config.appUrl + routes.HOME_URL,
            })
            .then(() => {
              console.log("email verification sent");
            })
            .catch(() => {
              console.log("user not logged in.");
            });
      });
    }
  }, [auth, config.appUrl, usersService]);

  return hasPreferences ? (
    <div className={classes.root}>
      <h2>email verificaiion</h2>
    </div>
  ) : (
    <InterestsView />
  );
}
