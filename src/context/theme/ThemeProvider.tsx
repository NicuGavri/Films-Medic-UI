import { createContext, useContext, useEffect, FC } from "react"
import { ThemeContext, ThemeProps } from "./types"

const themeContext = createContext<ThemeContext>({
    toggleTheme: () => null,
})
  
  const ThemeProvider : FC<ThemeProps>  = ({children}) => {
        const toggleTheme = () => {
           document.documentElement.classList.add("dark")
           localStorage.setItem("theme", "dark")
        }

        useEffect(() => {
            const theme = localStorage.getItem('theme')
            document.documentElement.classList.add(theme || "dark")
        })

        return (
            <themeContext.Provider value={{toggleTheme}}>
                {children}
            </themeContext.Provider>
        )
  }

  export const ThemeState = () => {
    return useContext(themeContext)
  }

  export default ThemeProvider