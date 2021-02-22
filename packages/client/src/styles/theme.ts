import { createMuiTheme, Theme } from "@material-ui/core/styles";
import fsCore from "./theme/core";

export const materialTheme: Theme = createMuiTheme({
  palette: {
    divider: "rgba(0, 0, 0, 0.12)",
    type: "light",
    primary: {
      contrastText: fsCore.textLight.primary,
      light: fsCore.primary.lighter,
      main: fsCore.primary.base,
      dark: fsCore.primary.darker,
    },
    secondary: {
      contrastText: fsCore.textLight.primary,
      light: fsCore.secondary.lighter,
      main: fsCore.secondary.base,
      dark: fsCore.secondary.darker,
    },
    error: {
      main: fsCore.alert.error.base,
      dark: fsCore.alert.error.darker,
    },
    info: {
      main: fsCore.alert.info.base,
      dark: fsCore.alert.info.darker,
    },
    success: {
      main: fsCore.alert.success.base,
      dark: fsCore.alert.success.darker,
    },
    warning: {
      main: fsCore.alert.warning.base,
      dark: fsCore.alert.warning.darker,
    },
    text: {
      primary: fsCore.textLight.primary,
      secondary: fsCore.textLight.secondary,
      disabled: fsCore.textLight.disabled,
      hint: fsCore.textLight.hint,
    },
    background: {
      default: fsCore.background.default,
      paper: fsCore.background.paper,
    },
    common: {
      black: fsCore.common.black,
      white: fsCore.common.white,
    },
  },
});

const AppTheme = {
  primary: materialTheme.palette.primary.main,
  primaryText: materialTheme.palette.text.primary,
  secondary: materialTheme.palette.secondary.main,
  background: materialTheme.palette.grey[200],
  cardWidth: "900px",
  input: materialTheme.palette.info.main,
  hover: materialTheme.palette.grey[100],
  cardWidthSmall: materialTheme.breakpoints.values.sm,
};

export default AppTheme;

// TODO: Separate Material Ui Elevation
// materialTheme.shadows = ([
//   "none",
//   fstdElevation.elev01dp,
//   fstdElevation.elev02dp,
//   fstdElevation.elev03dp,
//   fstdElevation.elev04dp,
//   fstdElevation.elev06dp,
//   fstdElevation.elev08dp,
//   fstdElevation.elev09dp,
//   fstdElevation.elev12dp,
//   fstdElevation.elev16dp,
//   fstdElevation.elev24dp,
// ] as unknown) as Theme["shadows"];
