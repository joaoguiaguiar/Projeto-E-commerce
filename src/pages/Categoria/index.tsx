import { useState } from "react";
import { useParams } from "react-router-dom";
import Banner from "../../components/Banner";
import AbCampoTexto from "../../components/CampoTexto";
import Titulo from "../../components/Titulo";
import categorias from "../../json/categorias.json";
import { IProduto } from "../../interface/IProduto";
import "./Categoria.scss";
import Card from "../../components/Card";
import TagsCategorias from "../../components/TagsCategorias";

type CategoriaKeys = keyof typeof categorias;

const Categoria = () => {
  const [busca, setBusca] = useState<string>("");
  const { categoriaId } = useParams<{ categoriaId: string }>();

  const categoriaChave = categoriaId as CategoriaKeys;

  const itens = categoriaChave && categorias[categoriaChave] ? categorias[categoriaChave] : [];

  if (!categoriaChave || !itens.length) {
    return <h2>Categoria não encontrada</h2>;
  }

  const itensFiltrados: IProduto[] = itens.filter((item: IProduto) =>
    item.nome.toLowerCase().includes(busca.toLowerCase())
  );

  const handleBuscaChange = (value: string) => {
    setBusca(value);
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
            onChange={handleBuscaChange}
            darkmode={true}
            placeholderAlign="center"
          />
        </form>
      </Banner>

      <Titulo texto={categoriaChave.charAt(0).toUpperCase() + categoriaChave.slice(1)} />

      <div className="lista-cards">
        {itensFiltrados.length > 0 ? (
          <Card produtos={itensFiltrados} /> 
        ) : (
          <p className="txtNaoEncontrado">Elemento não encontrado</p> 
        )}
      </div>

      <TagsCategorias />
    </section>
  );
};

export default Categoria;
