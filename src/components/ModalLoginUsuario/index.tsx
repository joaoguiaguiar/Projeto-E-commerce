import { useState } from "react";
import { AbBotao, AbCampoTexto, AbModal } from "ds-alurabooks";
import { useAuth } from "../../state/hook/useAuth ";
import imagemPrincipal from './assets/login.png';
import './ModalLoginUsuario.scss';
import styled from "styled-components";



const TituloLoguin = styled.h4`
  text-align:center;
  color: #EB9B00;
  font-size: 3rem;
`;

const Container = styled.div`
  padding: 2rem;
  display: flex;
  justify-content: space-between;
  @media (max-width: 768px) {
   flex-direction: column;
}


`;
interface PropsModalLoginUsuario {
    aberta: boolean;
    aoFechar: () => void;
    aoEfetuarLogin: (email: string) => void;
    aoAbrirModalCadastro: () => void;  // Nova prop
  }
  
  const ModalLoginUsuario = ({ aberta, aoFechar, aoEfetuarLogin, aoAbrirModalCadastro }: PropsModalLoginUsuario) => {
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const { signin } = useAuth();
  
    const aoSubmeterFormular = (evento: React.FormEvent<HTMLFormElement>) => {
      evento.preventDefault();
  
      const mensagem = signin(email, senha);
      if (mensagem) {
        alert(mensagem);
      } else {
        alert("Login realizado com sucesso!");
        aoEfetuarLogin(email);
        aoFechar();
      }
    };
  
    return (
      <AbModal
        titulo=""
        aberta={aberta}
        aoFechar={aoFechar}
      >
        <section className="corpoModalCadastro">
          <figure>
            <img src={imagemPrincipal} alt="Pessoa segurando uma chave na frente de uma tela de computador que está exibindo uma fechadura" />
          </figure>
          <form onSubmit={aoSubmeterFormular}>
            <TituloLoguin>Login</TituloLoguin>
  
            <AbCampoTexto
              label="E-mail"
              value={email}
              onChange={setEmail}
              type="email"
            />
            <AbCampoTexto
              label="Senha"
              value={senha}
              onChange={setSenha}
              type="password"
            />
            <div className="acoes">
              <AbBotao texto="Fazer login" />
            </div>
  
            <hr className="linha" />
  
            <Container>
              <p>Ainda não tem uma conta?</p>
              <button 
                className="btn__Loguin"
                onClick={aoAbrirModalCadastro} 
              >
                Criar Conta
              </button>
            </Container>
          </form>
        </section>
      </AbModal>
    );
  };
  
  export default ModalLoginUsuario;
  
