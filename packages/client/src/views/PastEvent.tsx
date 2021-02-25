import React, { useContext, useEffect, useState } from "react";
import { AppDependencies, AppDependenciesContext } from "../appDependencies";
import { useMemo } from "react";
import UsersService from "../services/usersService";
import { User } from "../models/user";
import EventDetailsComponent from "./EventDetailsComponent";

export default function EventDetailsView(props) {
  const { db, auth }: AppDependencies = useContext(AppDependenciesContext);
  const userService = useMemo(() => new UsersService(db), [db]);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    userService.getUser(auth.currentUser.uid).then((user: User) => {
      setIsAdmin(user.isAdmin);
    });
  }, [auth.currentUser.uid, userService]);

  return (
    <React.Fragment>
      {!isAdmin ? (
        <div>
          This event has completed. You do not have permission to view this
          event.
        </div>
      ) : (
        <EventDetailsComponent event={props.event} />
      )}
    </React.Fragment>
  );
}
