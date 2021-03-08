import React from "react";

export const themes = {
  dark: {
    color: "#4ecca3",
    background: "#232931",
  },
  light: {
    // color: "#1e56a0",
    color: "#000000",
    background: "#f5feff",
  },
};

const ThemeContext = React.createContext(themes.dark);

export default ThemeContext;