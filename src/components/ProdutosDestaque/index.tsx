import { useState, useEffect } from "react";
import "./ProdutosDestaque.scss";
import styled from "styled-components";
import { IProduto } from "../../interface/IProduto";
import { useCarrinho } from "../../state/context/CarrinhoContext";

interface ProdutosDestaqueProps {
  produtos: IProduto[];
}

const CardCarrocelEstilizado = styled.div`
  padding: 1rem;
  width: 70%;
  max-width: 500px;  
  height: auto;
  background-color: white;
  border-radius: 1rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  justify-content: space-between;

  .selecionado-detalhes {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    padding: 1rem;
  }

  .container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 12px;
  }

  .icones {
    display: flex;
    align-items: center;
    gap: 1rem;
    cursor: pointer;
  }

  @media (max-width: 768px) {
    max-width: 280px; 
  }
`;

const ProdutosDestaque = ({ produtos }: ProdutosDestaqueProps) => {
  const [index, setIndex] = useState(0);
  const produtoSelecionado = produtos[index];
  const { adicionarAoCarrinho } = useCarrinho();
  const [favoritos, setFavoritos] = useState<Record<number, boolean>>({});

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % produtos.length);
    }, 8000);

    return () => clearInterval(timer);
  }, [produtos.length]);

  const alternarFavorito = (id: number) => {
    setFavoritos((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const proximoItem = () => {
    setIndex((prevIndex) => (prevIndex + 1) % produtos.length);
  };

  const itemAnterior = () => {
    setIndex((prevIndex) =>
      prevIndex === 0 ? produtos.length - 1 : prevIndex - 1
    );
  };

  return (
    <section className="ProdutosDestaque">
      <button onClick={itemAnterior} className="navegacao-esquerda">
        <i className="bi bi-caret-left-square"></i>
      </button>

      <div className="imagem-container">
        <img src={produtoSelecionado.imagem} className="imagem" alt={produtoSelecionado.nome} />
      </div>

      <CardCarrocelEstilizado>
        <div className="selecionado-detalhes">
          <h6>{produtoSelecionado.nome}</h6>
          <p>{produtoSelecionado.descricao}</p>
          <p>R${produtoSelecionado.preco}</p>
          <div className="container">
            <button
              className="btnCard"
              onClick={() => adicionarAoCarrinho(produtoSelecionado)}
            >
              Comprar
            </button>

            <span
              className="icones"
              onClick={() => alternarFavorito(produtoSelecionado.id)}
            >
              <i
                className={favoritos[produtoSelecionado.id] ? "bi bi-heart-fill" : "bi bi-heart"}
              ></i>
            </span>
          </div>
        </div>
      </CardCarrocelEstilizado>

      <button onClick={proximoItem} className="navegacao-direita">
        <i className="bi bi-caret-right-square seta-direita"></i>
      </button>
    </section>
  );
};

export default ProdutosDestaque;
