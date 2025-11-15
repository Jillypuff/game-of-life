import ToggleThemeButton from "./ToggleThemeButton"
import "@styles/components/Header.scss"

const title = "Game of life"
const links = {
  home: "Home",
  about: "About",
  placeholder: "placeholder",
}
const profilePlaceholder = "Profile"

const Header = () => {
  return (
    <div className="header">
      <div className="title">{title}</div>
      <div className="navigation">
        <ul>
          <li>{links.home}</li>
          <li>{links.about}</li>
          <li>{links.placeholder}</li>
          <li>{links.placeholder}</li>
        </ul>
      </div>
      <div className="profile">{profilePlaceholder}</div>
      <div>
        <ToggleThemeButton />
      </div>
    </div>
  )
}

export default Header
