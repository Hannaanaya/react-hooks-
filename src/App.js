import React, { useState, useEffect } from "react";
import "./App.css";
import Header from "./components/Header";
import Characters from "./components/Characters";
import ThemeContext, { themes } from "./context/ThemeContext";

function App() {
  useEffect(() => {
    if (localStorage.getItem("theme") === "dark") {
      darkTheme();
    } else if (localStorage.getItem("theme") === "light") {
      lightTheme();
    } else if (localStorage.getItem("theme") === null) {
      detectColorScheme();
    }
  });

  const [theme, setTheme] = useState(themes.dark);

  const darkTheme = () => {
    setTheme(themes.dark);
    document.documentElement.setAttribute("data-theme", "dark");
    localStorage.setItem("theme", "dark");
  };

  const lightTheme = () => {
    setTheme(themes.light);
    document.documentElement.setAttribute("data-theme", "light");
    localStorage.setItem("theme", "light");
  };

  const detectColorScheme = () => {
    if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
      darkTheme();
    } else if (window.matchMedia("(prefers-color-scheme: light)").matches) {
      lightTheme();
    } else {
      darkTheme();
    }
  };

  const handleClick = () => {
    if (theme === themes.light) {
      darkTheme();
    } else if (theme === themes.dark) {
      lightTheme();
    }
    //theme === themes.dark ? setTheme(themes.light) : setTheme(themes.dark);
  };

  return (
    <ThemeContext.Provider value={theme}>
      <div style={theme} className="App">
        <Header />
        <button type="button" onClick={handleClick}>
          Change Color Theme
        </button>
        <Characters />
      </div>
    </ThemeContext.Provider>
  );
}

export default App;
