import "@styles/components/Footer.scss"

const Footer = () => {
  const currentYear = new Date().getFullYear()

  return (
    <div className="footer">
      <p className="text-xs italic">© {currentYear} All rights reserved.</p>
    </div>
  )
}

export default Footer
