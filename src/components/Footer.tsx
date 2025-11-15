import "@styles/components/Footer.scss"

// @Text
const rights_ending = "All rights reserved."

const Footer = () => {
  const currentYear = new Date().getFullYear()
  const rights = `© ${currentYear} ${rights_ending}`

  return (
    <div className="footer">
      <p className="text-xs italic">{rights}</p>
    </div>
  )
}

export default Footer
