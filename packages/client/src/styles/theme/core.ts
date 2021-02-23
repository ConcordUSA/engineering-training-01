import { colors } from "@material-ui/core";

// LINK BELOW TO SEE THE DEFAULT VALUES
// https://material-ui.com/customization/default-theme/?expand-path=$.palette

// type Modify<T, R> = Omit<T, keyof R> & R;

export interface IColorTheme {
  divider: string;
  type: string;
  primary: IColorCore;
  secondary: IColorCore;
  textLight: IColorText;
  textDark: IColorText;
  iconLight: IColorIcon;
  iconDark: IColorIcon;
  alert: IColorAlerts;
  background: IColorBackground;
  common: IColorCommon;
  action: IColorAction;
}
interface IColorCore {
  base: string;
  lighter: string;
  darker: string;
}
interface IColorAction {
  active: string;
  hover: string;
  hoverOpacity: number;
  selected: string;
  selectedOpacity: number;
  disabled: string;
  disabledOpacity: number;
  disabledBackground: string;
  focus: string;
  focusOpacity: number;
  activatedOpacity: number;
}
interface IColorCommon {
  white: string;
  black: string;
}
interface IColorBackground {
  default: string;
  paper: string;
}
interface IColorText {
  primary: string;
  secondary: string;
  disabled: string;
  hint: string;
}
interface IColorIcon {
  active: string;
  inactive: string;
}
interface IColorAlert {
  base: string;
  darker: string;
}
interface IColorAlerts {
  error: IColorAlert;
  info: IColorAlert;
  warning: IColorAlert;
  success: IColorAlert;
}

// TODO - Implement Mathematical Relationship Between Theme
const fsCore: Partial<IColorTheme> = {
  primary: {
    base: colors.red[700],
    lighter: "#ff6659",
    darker: "#9a0007",
  },
  secondary: {
    base: colors.blueGrey[600],
    lighter: "#819ca9",
    darker: "#29434e",
  },
  textLight: {
    primary: "rgba(0, 0, 0, 0.87)",
    secondary: "rgba(0, 0, 0, 0.54)",
    disabled: "rgba(0, 0, 0, 0.38)",
    hint: "rgba(0, 0, 0, 0.12)",
  },
  textDark: {
    primary: "rgba(255, 255, 255, 1);",
    secondary: "rgba(255, 255, 255, 0.7)",
    disabled: "rgba(255, 255, 255, 0.5)",
    hint: "rgba(255, 255, 255, 0.12)",
  },
  iconLight: {
    active: "rgba(0, 0, 0, 0.54)",
    inactive: "rgba(0, 0, 0, 0.38)",
  },
  iconDark: {
    active: "rgba(255, 255, 255, 1)",
    inactive: "rgba(255, 255, 255, 0.5)",
  },
  alert: {
    error: {
      base: "#ff4444",
      darker: "#CC0000",
    },
    info: {
      base: "#33b5e5",
      darker: "#0099CC",
    },
    success: {
      base: "#00C851",
      darker: "#007E33",
    },
    warning: {
      base: "#ffbb33",
      darker: "#FF8800",
    },
  },
  background: {
    default: colors.grey[200],
    paper: "#fafafa",
  },
  common: {
    black: "rgba(23, 23, 23, 1)",
    white: "rgba(255, 255, 255, 1)",
  },
};

export default fsCore;
