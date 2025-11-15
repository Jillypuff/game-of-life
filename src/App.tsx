import { Outlet } from "react-router-dom"
import Header from "@components/Header"
import Footer from "@components/Footer"
import "@styles/main.scss"

const App = () => {
  return (
    <div className="site-layout">
      <header>
        <div className="content-wrapper">
          <Header />
        </div>
      </header>
      <main>
        <div className="content-wrapper">
          <Outlet />
        </div>
      </main>
      <footer>
        <div className="content-wrapper">
          <Footer />
        </div>
      </footer>
    </div>
  )
}

export default App
