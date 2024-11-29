import './Rodape.scss';
import pix from '../../assets/pagamento/logo-pix.svg';
import elo from '../../assets/pagamento/payment-elo.png';
import visa from '../../assets/pagamento/payment-visa.png';
import googlePay from '../../assets/pagamento/payment-google-pay.svg';
import hipercard from '../../assets/pagamento/payment-hipercard.png';






const Rodape = () => {
    return (
        <footer className="rodape">
            <h2 className="rodape__titulo">Loja Fashion</h2>


        



                <ul className="lista-rodape">
                    <li className="lista-rodape__titulo">Navegação</li>
                    <li className="lista-rodape__item"><a href="#!" className="lista-rodape__link">Início</a></li>
                    <li className="lista-rodape__item"><a href="#!" className="lista-rodape__link">Coleção</a></li>
                    <li className="lista-rodape__item"><a href="#!" className="lista-rodape__link">Promoções</a></li>
                    <li className="lista-rodape__item"><a href="#!" className="lista-rodape__link">Contato</a></li>
                </ul>

                <ul className="lista-rodape">
                    <li className="lista-rodape__titulo">Formas de Pagamento</li>
                    <li className="lista-rodape__cartao">
                        <span><img src={pix} className="lista-rodape__icon" alt="Pix" /></span>
                        <span><img src={elo} className="lista-rodape__icon" alt="Elo" /></span>
                        <span><img src={visa} className="lista-rodape__icon" alt="Visa" /></span>
                        <span><img src={googlePay} className="lista-rodape__icon" alt="Google Pay" /></span>
                        <span><img src={hipercard} className="lista-rodape__icon" alt="Hipercard" /></span>
                    </li>
                </ul>

                <div className="rodape__social">
                    <h3 className="rodape__titulo">Siga-nos</h3>
                    <a href="#!" className="rodape__link">
                        <span className="material-icons">facebook</span>
                    </a>
                    <a href="#!" className="rodape__link">
                        <span className="material-icons">instagram</span>
                    </a>
                    <a href="#!" className="rodape__link">
                        <span className="material-icons">twitter</span>
                    </a>
                </div>

        </footer>
    );
};

export default Rodape;
