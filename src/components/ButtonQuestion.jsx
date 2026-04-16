export default function ButtonQuestion({questoes,onOpen, modalOpen,bloqueada, solu}){

    const queId = `dialog-4${questoes.id}`

    const baseIcon = questoes.baseIcon ?? "alvo.png"

    const icon = bloqueada ? "errado.png" : solu ?
    "correto.png" : baseIcon

    const aria = bloqueada
    ? `${questoes.titulo}(bloqueada, resolva a anterior)`
    : solu
    ? `${questoes.titulo} (resolvida)`
    : `${questoes.titulo}(disponivel)`

    return (
        <li className="icon-grid-item">
            <button
                type="button"
                className={`icon-button ${bloqueada ??
                    "icon-button--locked"} ${solu ?? "icon-button--salved"}`}
                    aria-haspopup="dialog"
                    aria-controls={queId}
                    aria-label={aria}
                    aria-disabled={bloqueada || undefined}
                    onClick={() => onOpen(questoes)}
                    disabled={bloqueada}
            >
                <img className="icon-button-img" aria-hidden="true"
                src={icon} alt={`imagem de um ${icon}`} />
                <span className="visually-hidden">{questoes.titulo}</span>

            </button>
        </li>
    )

}