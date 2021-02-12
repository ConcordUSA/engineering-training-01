import { createMuiTheme } from '@material-ui/core/styles';
import * as colors from "@material-ui/core/colors";

const AppTheme = {
  primary: colors.red[500],
  primaryText: "#ffffff",
  secondary: colors.red[300]
};

export default AppTheme;

export const materialTheme = createMuiTheme({
  palette: {
    primary: {
      main: colors.red[500],
    },
    secondary: {
      main: colors.red[300],
    },
  },
});