// src/ThemeContext.js
import { createContext } from "react";

export const ThemeContext = createContext({
  theme: "default",
  setTheme: () => {},
});
