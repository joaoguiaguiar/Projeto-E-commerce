import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import BotaoNavegacao from "./BotaoNavegacao";
import ModalLoginUsuario from "../ModalLoginUsuario";
import ModalCadastroUsuario from "../ModalCadastroUsuario";
import BotaoCarrinho from "./BotaoCarrinho";
import ModalCarrinho from "../ModalCarrinho";
import usuario from "../../assets/usuario.svg";
import sacola from "./assets/Vector.png";
import styled from "styled-components";

import "./BarraNavegacao.scss";

// const Container = styled.div`
// display: flex;
// justify-content: space-between;

// @media (max-width: 1024px) {
//     gap: 1.5rem;
//   }

//   @media (max-width: 768px) {
//     flex-direction: row;
//     align-items: center;
//     gap: 1rem;
//   }
// `;



const BarraNavegacao = () => {
  const [modalCadastroAberta, setModalCadastroAberta] = useState(false);
  const [modalLoginAberta, setModalLoginAberta] = useState(false);
  const [modalCarrinhoAberta, setModalCarrinhoAberta] = useState(false);

  const [emailUsuario, setEmailUsuario] = useState<string | null>(null);
  const [qtdItensCarrinho, setQtdItensCarrinho] = useState(0);

  const navigate = useNavigate();

  useEffect(() => {
    const emailSalvo = localStorage.getItem("usuarioLogado");
    if (emailSalvo) {
      setEmailUsuario(emailSalvo);
    }
  }, []);

  const aoEfetuarLogin = (email: string) => {
    setEmailUsuario(email);
    localStorage.setItem("usuarioLogado", email);
    setModalLoginAberta(false);
  };

  const aoEfetuarLogout = () => {
    setEmailUsuario(null);
    localStorage.removeItem("usuarioLogado");
    navigate("/");
  };

  const aoAbrirModalCadastro = () => {
    setModalLoginAberta(false);
    setModalCadastroAberta(true);
  };

  return (
    <nav className="ab-navbar">
      <div className="container">
        <ul className="navegacao">
          <li className="loguin">
            <BotaoNavegacao
              texto="Login"
              textoAltSrc="Ícone representando um usuário"
              imagemSrc={usuario}
              onClick={() => setModalLoginAberta(true)}
            />
            <ModalLoginUsuario
              aberta={modalLoginAberta}
              aoFechar={() => setModalLoginAberta(false)}
              aoEfetuarLogin={aoEfetuarLogin}
              aoAbrirModalCadastro={aoAbrirModalCadastro}
            />
          </li>
          <li>
            <a href="#!" className="btn_cate">Categorias</a>
            <ul className="submenu">
              <li><Link to="/categorias/eletronicos">Eletrônicos</Link></li>
              <li><Link to="/categorias/informatica">Informática</Link></li>
              <li><Link to="/categorias/cozinha">Cozinha</Link></li>
              <li><Link to="/categorias/audio-e-video">Áudio e Vídeo</Link></li>
              <li><Link to="/categorias/games">Games</Link></li>
            </ul>
          </li>
        </ul>
        <ul className="acoes">
          {!emailUsuario ? (
            <>
              <li>
                <div className="iconCadastro">
                  <BotaoNavegacao
                    texto="Cadastrar-se"
                    textoAltSrc="Ícone representando um usuário"
                    imagemSrc={usuario}
                    onClick={() => setModalCadastroAberta(true)}
                  />
                </div>

                <ModalCadastroUsuario
                  aberta={modalCadastroAberta}
                  aoFechar={() => setModalCadastroAberta(false)}
                />
              </li>
              <li className="iconCarrinho">
                <BotaoCarrinho
                  textoAltSrc="Ícone representando um carrinho"
                  imagemSrc={sacola}
                  onClick={() => alert("Ops! Você precisa estar logado para comprar.")}
                  qtdItens={qtdItensCarrinho}
                />
              </li>
            </>
          ) : (
            <>
              <li className="btnMinhaConta">
                <Link to="/minha-conta/pedidos">Minha Conta</Link>
              </li>
              <li className="iconCarrinho">
                <BotaoCarrinho
                  textoAltSrc="Ícone representando um carrinho"
                  imagemSrc={sacola}
                  onClick={() => setModalCarrinhoAberta(true)}
                  qtdItens={qtdItensCarrinho}
                />
                <ModalCarrinho
                  aberta={modalCarrinhoAberta}
                  aoFechar={() => setModalCarrinhoAberta(false)}
                />
              </li>
              <li className="btnLogout">
                <button onClick={aoEfetuarLogout} className="btnSair">Sair</button>
              </li>
            </>
          )}
        </ul>
      </div>


    </nav>
  );
};

export default BarraNavegacao;

