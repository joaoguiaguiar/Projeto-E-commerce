import './BotaoNavegacao.scss'


interface BotaoNavegacaoProps {
    imagemSrc: string
    textoAltSrc: string
    texto?: string
    onClick?: () => void
}

const BotaoNavegacao = ({ imagemSrc, texto, textoAltSrc, onClick }: BotaoNavegacaoProps) => {
    const manipularClick = () => {
        if (onClick) {
            onClick()
        }
    }

    return (

        <button className="btn-nav" onClick={manipularClick}>
            <img src={imagemSrc} alt={textoAltSrc} className='img__loguin' />
            <span className="btn-text">{texto}</span>
        </button>




    )
}

export default BotaoNavegacao