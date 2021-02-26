import React, { useContext, useState } from "react";
import { useHistory } from "react-router-dom";
import UserDetailsFormView from "./UserDetailsForm";
import InterestsFormView from "./InterestsForm";
import UsersService from "../../services/usersService";
import { AppDependencies, AppDependenciesContext } from "../../appDependencies";
import routes from "../../constants/routes";
import { createUserForm } from "../../store";
import { useRecoilState } from "recoil";
import { useSnackbar } from "notistack";

export default function CreateAccountView() {
  const history = useHistory();
  const [view, setView] = useState("details");
  const [user, setUser] = useRecoilState(createUserForm);
  const { enqueueSnackbar } = useSnackbar();
  const { db, auth }: AppDependencies = useContext(AppDependenciesContext);
  const usersService = new UsersService(db, auth);

  // we want this to handle which view is visible
  // we want this to handle the actual sending / creation of the account
  const handleRegister = async (data) => {
    const { error, message } = await usersService.createUser(data);
    if (error) {
      setView("details");
      const message = error.message ? error.message : error;
      enqueueSnackbar(message, { variant: "error" });
      return;
    }

    if (message) enqueueSnackbar(message);

    history.push(routes.EVENT_LIST_URL);
  };

  const handleOnSubmit = (resp: { action?: string; data }) => {
    const { action, data } = resp;
    const updatedUser = { ...user, ...data };

    setUser(updatedUser);

    if (action === "navToInterests") setView("interests");
    if (action === "createUser") handleRegister(updatedUser);
  };

  return (
    <div>
      {view === "details" && <UserDetailsFormView onSubmit={handleOnSubmit} />}
      {view === "interests" && <InterestsFormView onSubmit={handleOnSubmit} />}
    </div>
  );
}
