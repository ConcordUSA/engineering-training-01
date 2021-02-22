import { createMuiTheme, Theme } from "@material-ui/core/styles";
import * as colors from "@material-ui/core/colors";
import fsCore from "./theme/core";

const AppTheme = {
  primary: fsCore.primary.base,
  primaryText: fsCore.textDark.primary,
  secondary: fsCore.secondary.base,
  background: colors.grey[200],
  cardWidth: "900px",
  input: colors.blue.A200,
  hover: colors.grey[100],
  cardWidthSmall: "600px",
};

export default AppTheme;

export const materialTheme: Theme = createMuiTheme({
  palette: {
    divider: "rgba(0, 0, 0, 0.12)",
    type: "light",
    primary: {
      contrastText: fsCore.textDark.primary,
      light: fsCore.primary.lighter,
      main: AppTheme.primary,
      dark: fsCore.primary.darker,
    },
    secondary: {
      contrastText: fsCore.textDark.primary,
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
