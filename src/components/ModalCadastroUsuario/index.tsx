import { useState, useEffect } from "react";
import { Button, Modal } from 'react-bootstrap';
import imgModal from './assets/login.png';
import './ModalCadastroUsuario.scss';
import styled from "styled-components";
import { useAuth } from "../../state/hook/useAuth ";
import { useRecoilState } from "recoil";
import { cepAtom, enderecoAtom } from "../../state/authState";
import { AbCampoTexto } from "ds-alurabooks";

interface PropsModalCadastroUsuario {
  aberta: boolean;
  aoFechar: () => void;
}

const ModalCadastroUsuario = ({ aberta, aoFechar }: PropsModalCadastroUsuario) => {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [cep, setCep] = useRecoilState(cepAtom);
  const [endereco, setEndereco] = useRecoilState(enderecoAtom);

  const { signup } = useAuth();

  const handleCadastro = (dadosUsuario: { cep: string; endereco: string }) => {
    setCep(dadosUsuario.cep);
    setEndereco(dadosUsuario.endereco);
    alert("Cadastro realizado com sucesso!");
  };

  const buscarEnderecoPorCep = async (cep: string) => {
    const cepNumerico = cep.replace(/\D/g, '');
    if (cepNumerico.length === 8) {
      try {
        const response = await fetch(`https://viacep.com.br/ws/${cepNumerico}/json/`);
        const dados = await response.json();
        if (!dados.erro) {
          setEndereco(`${dados.logradouro}, ${dados.bairro}, ${dados.localidade} - ${dados.uf}`);
        } else {
          console.error("CEP inválido");
          setEndereco('');
        }
      } catch (erro) {
        console.error("Erro ao buscar endereço:", erro);
      }
    }
  };

  useEffect(() => {
    if (cep && cep.length === 8) {
      buscarEnderecoPorCep(cep);
    }
  }, [cep]);

  const aoSubmeterFormular = (evento: React.FormEvent<HTMLFormElement>) => {
    evento.preventDefault();

    if (!nome || !email || !cep || !endereco || !senha) {
      alert("Todos os campos são obrigatórios!");
      return;
    }

    const mensagem = signup(nome, email, cep, endereco, senha);
    alert(mensagem);

    if (mensagem === "Cadastro realizado com sucesso!") {
      aoFechar();
    }
  };

  const TituloFormEstilizado = styled.h4`
    text-align: center;
    color: #EB9B00;
    text-transform: uppercase;
    font-size: 2rem;
  `;

  return (
    <Modal show={aberta} onHide={aoFechar} centered size="lg" className="modal">
      <Modal.Header closeButton>
        <Modal.Title>Cadastro</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <section className="corpoModalCadastro">
          <figure>
            <img
              src={imgModal}
              alt="Pessoa segurando uma chave na frente de uma tela de computador que está exibindo uma fechadura"
            />
          </figure>
          <form onSubmit={aoSubmeterFormular}>
            <TituloFormEstilizado>Cadastrar</TituloFormEstilizado>

            <AbCampoTexto
              label="Nome"
              value={nome}
              onChange={setNome}

            />
            <AbCampoTexto
              label="E-mail"
              value={email}
              onChange={setEmail}
              type="email"
            />
            <AbCampoTexto
              label="CEP"
              value={cep}
              onChange={setCep}
            />
            <AbCampoTexto
              label="Endereço"
              value={endereco}
              onChange={setEndereco}
            />
            <AbCampoTexto
              label="Senha"
              value={senha}
              onChange={setSenha}
              type="password"
            />
            <div className="acoes">
              <button type="submit" className="btnCadastrar">
                Cadastrar
              </button>
            </div>
          </form>
        </section>
      </Modal.Body>
    </Modal>
  );
};

export default ModalCadastroUsuario;
