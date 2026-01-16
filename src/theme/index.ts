import { Provider as PaperProvider, MD3LightTheme } from "react-native-paper";

export const LightTheme = {
  ...MD3LightTheme,
  colors: {
    ...MD3LightTheme.colors,
    background: "#ffffff",
    card: "#ffffff",
    text: "#000000",
  },
};
