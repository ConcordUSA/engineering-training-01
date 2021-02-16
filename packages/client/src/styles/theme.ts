import { createMuiTheme } from "@material-ui/core/styles";
import * as colors from "@material-ui/core/colors";

const AppTheme = {
  primary: colors.red.A400,
  primaryText: "#ffffff",
  secondary: colors.red.A700,
  background: colors.grey[200],
  cardWidth: "900px",
  input: colors.blue.A200
};

export default AppTheme;

export const materialTheme = createMuiTheme({
  palette: {
    primary: {
      main: AppTheme.primary,
    },
    secondary: {
      main: AppTheme.secondary,
    },
  },
});
