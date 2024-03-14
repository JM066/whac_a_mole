import Button from "@/component/Button"
import Typography from "@/component/Typography"
import { useNavigate } from "react-router-dom"

function Home() {
  const navigate = useNavigate()

  return (
    <div className="flex gap-4">
      <Button theme="Default" onClick={() => navigate("/wordle")}>
        <Typography as="h2" text="Wordle" />
      </Button>
      <Button onClick={() => navigate("/whac-a-mole")}>
        <Typography as="h2" text="Whac-A-Mole" />
      </Button>
    </div>
  )
}
export default Home
