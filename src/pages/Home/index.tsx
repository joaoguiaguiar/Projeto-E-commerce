import { useState } from "react";
import styled from "styled-components";
import Banner from "../../components/Banner";
import AbCampoTexto from "../../components/CampoTexto";
import Titulo from "../../components/Titulo";
import maisVendidos from "../../json/maisVendidos.json";
import produtosPromossao from "../../json/produtosPromossao.json";
import categorias from "../../json/categorias.json";
import TagsCategorias from "../../components/TagsCategorias";
import Newsletter from "../../components/Newsletter";
import Card from "../../components/Card";
import ProdutosDestaque from "../../components/ProdutosDestaque";
import { IProduto } from "../../interface/IProduto";

const BlocoEstilizado = styled.div`
  background-color: #021526;
  height: 90px;
`;

const HomePage = () => {
  const [busca, setBusca] = useState<string>(""); 
  const [mostrarMaisVendidos, setMostrarMaisVendidos] = useState<boolean>(true); 

  const todosProdutos: IProduto[] = [
    ...Object.values(categorias).flat(),
    ...maisVendidos,
  ].filter((produto, index, self) => self.findIndex((p) => p.id === produto.id) === index);

  const produtosExibir = busca.trim()
    ? todosProdutos.filter((produto) =>
        produto.nome.toLowerCase().includes(busca.toLowerCase())
      )
    : maisVendidos;

  const handleBlur = () => {
    setBusca("");
    setMostrarMaisVendidos(true);
  };

  const handleFocus = () => {
    setMostrarMaisVendidos(false);
  };

  return (
    <section>
      <Banner
        titulo="Produtos que estão bombando"
        subtitulo="Encontre na nossa estante o que você está procurando e aproveite as ofertas incríveis!"
      >
        <form className="buscar">
          <AbCampoTexto
            placeholder="O que você está procurando hoje?"
            value={busca}
            onChange={(value) => setBusca(value)}
            onBlur={handleBlur} 
            onFocus={handleFocus} 
            darkmode={true}
            placeholderAlign="center"
          />
        </form>
      </Banner>

      {mostrarMaisVendidos ? (
        <div>
          <Titulo texto="MAIS VENDIDOS" />
          <Card produtos={maisVendidos} />
        </div>
      ) : (
        <div>
          <Titulo texto="RESULTADOS DA BUSCA" />
          {produtosExibir.length > 0 ? (
            <Card produtos={produtosExibir} />
          ) : (
            <p className="txtNaoEncontrado">
              Nenhum item encontrado para "{busca}".
            </p>
          )}
        </div>
      )}

      <BlocoEstilizado />
      <Titulo texto="PRODUTOS NA PROMOÇÃO" />
      <ProdutosDestaque produtos={produtosPromossao} />
      <TagsCategorias />
      <Newsletter />
      <hr />
    </section>
  );
};

export default HomePage;

