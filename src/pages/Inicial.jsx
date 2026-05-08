import "./Inicial.css"

function Inicial({ setTela }) {
  return (
    <main className="home">
      <div className="overlay">
        <h1>The Last of Us</h1>

        <button
          className="botao-iniciar"
          onClick={() => setTela("menu")}
        >
          Iniciar
        </button>
      </div>
    </main>
  )
}

export default Inicial