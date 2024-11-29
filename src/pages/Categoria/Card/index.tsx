import { useState } from "react";
import styled from "styled-components";
import estrela from "../../../assets/Star 5.png";
import { IProduto } from "../../../interface/IProduto";
import { useCarrinho } from "../../../state/context/CarrinhoContext";
import "./Card.scss";

const CardEstilizado = styled.div`
  padding: 1rem;
  display: flex;
  flex-direction: column;
  background-color: #ffffff;
  width: 250px;
  height: 430px;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  margin: 1rem;
  text-align: left;

  @media (max-width: 768px) {
    width: 90%;
    margin: 0 auto;
  }
`;

const ContainerEstrela = styled.figure`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const ContainerBotoes = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  padding-top: 2rem;
  align-items: center;
`;

const BotaoContainer = styled.div`
  margin-bottom: 1rem;
`;

const ImagemProduto = styled.img`
  width: 100px;
  height: 150px;
  object-fit: contain;
  margin-bottom: 1rem;
`;

const PrecoContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

const PrecoOriginal = styled.div`
  font-size: 0.9rem;
  font-weight: bold;
  color: #ff6500;
  text-decoration: line-through;
`;

const PrecoComDesconto = styled.div`
  font-size: 0.9rem;
  font-weight: bold;
  color: #2e8b57;
`;

const TextoPreco = styled.span`
  font-size: 0.9rem;
  color: #555;
  margin-right: 1rem;
`;

const Container = styled.div`
  margin-right: 6rem;

  @media (max-width: 768px) {
    margin-right: 150px !important;
  }
`;

interface CardProps {
  produtos: IProduto[]; 
}

const CardCategoria = ({ produtos }: CardProps) => {
  const { adicionarAoCarrinho } = useCarrinho();
  const [favoritos, setFavoritos] = useState<Record<number, boolean>>({});

  const alternarFavorito = (id: number) => {
    setFavoritos((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  return (
    <section className="MaisVendidos_card">
      {produtos.map((produto) => {
        const precoComDesconto = (produto.preco * 0.95).toFixed(2);
        const isFavorito = favoritos[produto.id] || false;

        return (
          <CardEstilizado key={produto.id}>
            <figure>
              <ImagemProduto src={produto.imagem} alt={`Imagem de ${produto.nome}`} />
            </figure>

            <p>{produto.nome}</p>

            <Container>
              <ContainerEstrela>
                {[...Array(5)].map((_, index) => (
                  <img key={index} src={estrela} alt="Estrela de avaliação" />
                ))}
              </ContainerEstrela>

              <PrecoContainer>
                <TextoPreco>A partir de:</TextoPreco>
                <PrecoOriginal>R$ {produto.preco.toFixed(2)}</PrecoOriginal>
                <PrecoComDesconto>R$ {precoComDesconto}</PrecoComDesconto>
              </PrecoContainer>
            </Container>

            <ContainerBotoes>
              <BotaoContainer>
                <button
                  className="botaoCard"
                  onClick={() => adicionarAoCarrinho(produto)}
                  style={{ cursor: "pointer" }}
                >
                  Comprar
                </button>
              </BotaoContainer>

              <div onClick={() => alternarFavorito(produto.id)} style={{ cursor: "pointer" }}>
                <i className={isFavorito ? "bi bi-heart-fill" : "bi bi-heart"}></i>
              </div>
            </ContainerBotoes>
          </CardEstilizado>
        );
      })}
    </section>
  );
};

export default CardCategoria;