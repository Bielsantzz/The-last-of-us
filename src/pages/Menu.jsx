import "./Menu.css"


function Menu ({setTela}){
    return (
        <main className="menu">
            <div className="menu-container">
            <h1>The Last of Us</h1>

            <button onClick={() => setTela("fases")}>
                Novo jogo
            </button>

            <button>Opções</button>
            <button>Créditos</button>


            </div>
        </main>
    )
}
export default Menu