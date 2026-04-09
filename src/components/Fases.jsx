import { useMemo, useState } from "react"
import QUESTOES from "../../public/data/perguntas.json"
import "./fases.css"



export default function Fases(){
    const [selecionada, setSelecionada] = useState(null)
    const [trancada, setTrancadas] = useState (0);
    const [resolvidas, setResolvidas] = useState (() => new Set())
    
    const total = QUESTOES.length

    const handleOpen = (q) => setselecionada(q);
    const handleClose = () => setselecionada(null);

    const handleCorrect = (id) => {
        setResolvidas((prev) => {
            const next = new Set (prev);
            next.add (id);
            return next
        });

        const idx =QUESTOES.findIndex ((q) =>
        q.id === id)
        if(idx > -1 && idx <QUESTOES.length -1)
            setTrancadas((prev) => Math.max(prev, idx +1))
    }

    //barra de progresso do jogo
    const progresso = useMemo(() => {
        const perguntasResolvidas = resolvidas.size;

        const porcentagem = Math.round((perguntasResolvidas/total) *100)

        return{
            resolvida: perguntasResolvidas,
            total: total,
            porcentagem:porcentagem
        }
    }, [resolvidas,total])

    
    return(
        <main className="questoes">
            <header className="q-header">
                    <h1 className="q-title">The Last of Us</h1>
                    <p className="q-subtitle"> Toque no icone para abrir a 
                    pergunta</p>

                    <div className="progress">
                        <div
                        className="progress-bar"
                        role = "progressbar"
                        aria-valuemain={0}
                        aria-valuemax={100}
                        aria-valuenow={progresso.porcentagem}
                        aria-label={`Progresso: ${progresso.resolvida}de
                        ${progresso.total}resolvidas`}
                        style={{width: `${progresso.porcentagem}%`}}/>
                        
                    <span className="progress-label">
                        {progresso.resolvida}/{progresso.total}
                    </span>


                    </div>
                

            </header>
        </main>
    )





}