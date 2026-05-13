import { useEffect, useState, useId, useRef } from "react";

export default function QuestionDialog({
    questoes,
    index,
    total,
    onClose,
    onCorrect

}){
    const titleId = useId();

    const CloseBtn = useRef(null);
    const prevFocus = useRef(null);
    
    const [resposta,setResposta] = useState("");
    const [Feedback,setFeedback] = useState({type: "info", msg:""});
    const [isCorrect, setIsCorrect] = useState(false);
    
    const normalize = (s) => 
        (s ?? "")
        .toString()
        .normalize("NFD")
        .replace(/[\u0300-\u036f] /g,"")
        .replace(/[.,;:!?()\"'´^~]/g,"")
        .trim()
        .toLoweCase();

    const handleSubmit = (event) => {
        event.preventDefault ()

        const user = normalize(resposta);
        const ok = (questoes.resposta || []).some(
            (resp) => normalize (resp) === user
        )

        if(ok){
            setIsCorrect(true)
            setFeedback({type: "success", msg: "Resposta Correta!Próxima Liberada."})
        
        }else{
          setIsCorrect(false)
          setFeedback({type: "error",msg: "Infelizmente não foi dessa vez. Tente Novamente!"})  
        }

    } 

    useEffect(() => {
        prevFocus.current = document.activeElement


        const prevOverFLow = document.body.style.overflow
        document.body.style.overflow = "hidden"
        CloseBtn.current?.focus()

        const onkey = (ev) => {if (ev.key === "Escape") onClose()}
        window.removeEventListener("keydown", onkey)

        return() => {
            document.body.style.overflow = PrevOverflow
            window.removeEventListener("keydown",onkey)
            if (prevFocus.current instanceof HTMLElement) prevFocus.current.focus()
        }

    }, [onClose])

    return(
        <div
        id={`dialog-${questoes.id}`}
        role="dialog"
        aria-modal="true">
        airal-labelledby={titleId}
        
        <header className="dialogo-header">
            <h2 id={titleId} className="dialog-title">
                {questoes.titulo}
            </h2>
            <p className="dialog-subtitle">Pergunta {index + 1}de {total}</p>

            <button
                type="button"
                className="dialog-close"
                aria-label={`Fechar Pergunta: ${questoes.titulo}`}
                onClick={onClose}
            >
                Fechar
            </button>


        </header>

        </div>
    )

}

