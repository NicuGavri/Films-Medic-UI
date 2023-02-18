import { createContext, useContext, useEffect, FC } from "react";
import { ThemeContext, ThemeProps } from "./types";

const themeContext = createContext<ThemeContext>({
  toggleTheme: () => null,
});

const ThemeProvider: FC<ThemeProps> = ({ children }) => {
  const defaultTheme = "dark";
  const lightTheme = "light";

  const toggleTheme = () => {
    const selectedTheme = localStorage.getItem("theme");
    const newTheme = selectedTheme === defaultTheme ? lightTheme : defaultTheme;

    document.documentElement.classList.remove(selectedTheme as string);
    document.documentElement.classList.add(newTheme);

    localStorage.setItem("theme", newTheme);
  };

  useEffect(() => {
    const theme = localStorage.getItem("theme");
    document.documentElement.classList.add(theme || "dark");
  });

  return (
    <themeContext.Provider value={{ toggleTheme }}>
      {children}
    </themeContext.Provider>
  );
};

export const ThemeState = () => {
  return useContext(themeContext);
};

export default ThemeProvider;
