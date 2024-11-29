import { useState } from "react";
import { Button, Modal } from 'react-bootstrap';
import imagemPrincipal from './assets/login.png';
import './ModalLoginUsuario.scss';
import styled from "styled-components";
import { AbCampoTexto } from "ds-alurabooks";
import { useAuth } from "../../state/hook/useAuth ";

const TituloLoguin = styled.h4`
  text-align: center;
  color: #EB9B00;
  font-size: 2.5rem;  
`;

const Container = styled.div`
  padding: 2rem;
  display: flex;
  justify-content: space-between;
  flex-direction: column; 
  align-items: center;  
  @media (min-width: 768px) {
    flex-direction: row;
  }
`;

interface PropsModalLoginUsuario {
  aberta: boolean;
  aoFechar: () => void;
  aoEfetuarLogin: (email: string) => void;
  aoAbrirModalCadastro: () => void;
}

const ModalLoginUsuario = ({
  aberta,
  aoFechar,
  aoEfetuarLogin,
  aoAbrirModalCadastro
}: PropsModalLoginUsuario) => {
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
      setEmail(''); 
      setSenha(''); 
      aoFechar();
    }
  };

  return (
    <Modal show={aberta} onHide={aoFechar} size="lg" centered>
      <Modal.Header closeButton>
        <Modal.Title>Login</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <section className="corpoModalCadastro">
          <figure className="container__imagem">
            <img src={imagemPrincipal} alt="Pessoa segurando uma chave" className="imgModal"/>
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
              <Button className="btn__Loguin" type="submit">Fazer login</Button>
            </div>

            <hr className="linha" />

            <Container>
              <p>Ainda não tem uma conta?</p>
              <Button
                className="btn__Loguin"
                onClick={aoAbrirModalCadastro}
              >
                Criar Conta
              </Button>
            </Container>
          </form>
        </section>
      </Modal.Body>
    </Modal>
  );
};

export default ModalLoginUsuario;
