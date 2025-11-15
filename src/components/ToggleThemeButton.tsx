import { useTheme } from "@context/ThemeContext"
import "@styles/components/ToggleThemeButton.scss"

const ToggleThemeButton = () => {
  const { theme, toggleTheme } = useTheme()

  return (
    <button
      onClick={toggleTheme}
      type="button"
      className="button"
      aria-label={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
    >
      {theme === "light" ? "🌙" : "☀️"}
    </button>
  )
}

export default ToggleThemeButton
