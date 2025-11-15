import { Outlet } from "react-router-dom"
import "@styles/main.scss"

const App = () => {
  return (
    <div className="site-layout">
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}

export default App
