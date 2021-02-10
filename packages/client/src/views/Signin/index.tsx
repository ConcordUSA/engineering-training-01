import React from "react";
// import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import CreateAccount from "./CreateAccount";
import SignIn from "./SignIn";
import { signInView } from "../../store";
import { useRecoilState } from "recoil";

// const useStyles = makeStyles((theme: Theme) =>
//   createStyles({
//     root: {
//       display: "flex",
//       flexWrap: "wrap",
//       justifyContent: "center",
//       height: "100%",
//       width: "100%",
//     },
//   })
// );

export default function SignInView() {
  //   const classes = useStyles();
  const [signInViewState] = useRecoilState(signInView);
  //   const [showSignIn, setShowSignIn] = useState(false)

  return signInViewState ? <SignIn /> : <CreateAccount />;
}
