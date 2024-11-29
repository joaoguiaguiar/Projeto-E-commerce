import { useEffect, useState } from "react";
import { IPedido } from "../../interface/IPedido";
import { useCarrinho } from "../../state/context/CarrinhoContext";
import './Pedidos.scss';
import styled from "styled-components";


const ContainerBotoes = styled.div`

display: flex;
flex-direction: column;
gap: 6rem;

@media (max-width: 768px) {
margin-top:2rem ;  
flex-direction: row;
}


` 


const Pedidos = () => {


  const { pedidos: pedidosDoContexto, excluirPedido } = useCarrinho();
  const [pedidos, setPedidos] = useState<IPedido[]>([]);

  const formatador = Intl.NumberFormat('pt-br', { style: 'currency', currency: 'BRL' });


  useEffect(() => {
    const pedidosSalvos = JSON.parse(localStorage.getItem("pedidos") || "[]");
    setPedidos(pedidosSalvos.map((pedido: IPedido) => ({
      ...pedido,
      total: pedido.produtos.reduce(
        (acc, item) => acc + item.preco * item.quantidade,
        0
      ), 
    })));
  }, [pedidosDoContexto]);

  const excluirPedidoHandler = (pedidoId: number) => {
    excluirPedido(pedidoId);
  };


  return (
    <section className="pedidos">
      <h4>Meus Pedidos</h4>
      {pedidos.length > 0 ? (
        pedidos.map((pedido) => (
          <div className="pedido" key={pedido.id}>
            <ul>
              <li>Pedido: <strong>{pedido.id}</strong></li>
              <li>Data do pedido: <strong>{new Date(pedido.data).toLocaleDateString()}</strong></li>
              <li>Valor total: <strong>{formatador.format(pedido.total)}</strong></li>
              <li>Entrega realizada em: <strong>{pedido.entrega}</strong></li>
              <li>Produtos:</li>
              <ul>
                {pedido.produtos.map((produto) => (
                  <li key={produto.id}> 
                    {produto.nome} - Quantidade: {produto.quantidade} - Preço: {produto.preco}
                  </li>
                ))}
              </ul>
            </ul>

            <ContainerBotoes>
            <button onClick={() => excluirPedidoHandler(pedido.id)} className="excluir-btn"> Excluir Pedido</button>
            <button className="detahes-btn">Detalhes</button>
            </ContainerBotoes>
          
          </div>
        ))
      ) : (
        <p>Você ainda não possui pedidos.</p>
      )}
    </section>
  );


};

export default Pedidos;
