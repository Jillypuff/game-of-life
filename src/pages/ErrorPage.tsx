import { useEffect } from "react"
import { useNavigate } from "react-router-dom"

const header = "⚠️ Error!"
const content = "Something went wrong. Redirecting you back in 3 seconds..."

function ErrorPage() {
  const navigate = useNavigate()

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate(-1)
    }, 3000)

    return () => clearTimeout(timer)
  }, [navigate])

  return (
    <div>
      <h2>{header}</h2>
      <p>{content}</p>
    </div>
  )
}

export default ErrorPage
