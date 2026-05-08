import { useState } from "react"
import Inicial from "./pages/Inicial"
import Menu from "./pages/Menu"
import Fases from "./pages/Fases"

function App() {
  const [tela, setTela] = useState("inicio")

  return (
    <>
      {tela === "inicio" && <Inicial setTela={setTela} />}
      {tela === "menu" && <Menu setTela={setTela} />}
      {tela === "fases" && <Fases />}
    </>
  )
}

export default App