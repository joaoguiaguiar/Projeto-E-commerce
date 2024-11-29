import './BotaoCarrinho.scss'
import { useCarrinho } from '../../../state/context/CarrinhoContext';

interface BotaoCarrinhoProps {
    imagemSrc: string;
    textoAltSrc: string;
    texto?: string;
    onClick?: () => void;
    qtdItens?: number;
}

const BotaoCarrinho = ({ imagemSrc, texto, textoAltSrc, onClick, qtdItens }: BotaoCarrinhoProps) => {

    const { itensCarrinho } = useCarrinho();

    const totalItens = itensCarrinho.reduce((acc, item) => acc + item.quantidade, 0);


    const manipularClick = () => {
        if (onClick) {
            onClick();
        }
    };

    return (
        <div className="carrinho-container">
        <button className="btn-nav" onClick={manipularClick}>
            <img src={imagemSrc} alt={textoAltSrc} className="img__loguin" />
            {totalItens > 0 && <span className="badge">{totalItens}</span>}
        </button>
    </div>
    );
};

export default BotaoCarrinho;

