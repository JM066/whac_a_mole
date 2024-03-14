import { Suspense } from "react"
import { Route, Routes } from "react-router-dom"
import Wordle from "./pages/Wordle"
import WhacAMole from "./pages/WhacAMole"
import Home from "./pages/Home"
import "./App.scss"

function Fallback() {
  return <div>Fallback</div>
}

function App() {
  return (
    <Suspense fallback={<Fallback />}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/wordle" element={<Wordle />} />
        <Route path="/whac-a-mole" element={<WhacAMole />} />
      </Routes>
    </Suspense>
  )
}

export default App
