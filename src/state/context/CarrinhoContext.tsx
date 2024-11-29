import React, { createContext, useContext, useState, ReactNode, useEffect } from "react";
import { IProduto } from "../../interface/IProduto";
import { IPedido } from "../../interface/IPedido";

interface CarrinhoContextData {
  itensCarrinho: IProduto[];
  pedidos: IPedido[];
  adicionarAoCarrinho: (item: IProduto) => void;
  removerDoCarrinho: (id: number) => void;
  atualizarQuantidade: (id: number, quantidade: number) => void; 
  limparCarrinho: () => void;
  gerarPedido: (usuario: { cep: string }) => void;
  excluirPedido: (pedidoId: number) => void; 
  excluirTodosPedidos: () => void;
}

const CarrinhoContext = createContext<CarrinhoContextData | undefined>(undefined);

export const CarrinhoProvider = ({ children }: { children: ReactNode }) => {
  const [itensCarrinho, setItensCarrinho] = useState<IProduto[]>([]);
  const [pedidos, setPedidos] = useState<IPedido[]>([]);

  useEffect(() => {
    const pedidosSalvos = JSON.parse(localStorage.getItem("pedidos") || "[]");
    setPedidos(pedidosSalvos);
  }, []);

  const adicionarAoCarrinho = (item: IProduto) => {
    setItensCarrinho((prev) => {
      const itemExistente = prev.find((produto) => produto.id === item.id);
      if (itemExistente) {
        return prev.map((produto) =>
          produto.id === item.id
            ? { ...produto, quantidade: produto.quantidade + 1 }
            : produto
        );
      }
      return [...prev, { ...item, quantidade: 1 }];
    });
  };

  const atualizarQuantidade = (id: number, quantidade: number) => {
    if (quantidade < 1) return; 
    setItensCarrinho((prev) =>
      prev.map((produto) =>
        produto.id === id ? { ...produto, quantidade } : produto
      )
    );
  };
  const removerDoCarrinho = (id: number) => {
    setItensCarrinho((prev) => prev.filter((item) => item.id !== id));
  };

  const gerarPedido = (usuario: { cep: string }) => {
    if (!usuario.cep) {
      alert("Por favor, insira um CEP válido!");
      return;
    }

    const novoPedido: IPedido = {
      id: Math.floor(Math.random() * 1000000),
      data: new Date().toISOString(),
      total: itensCarrinho.reduce(
        (acc, item) => acc + item.preco * (item.quantidade || 1),
        0
      ),
      entrega: usuario.cep,
      produtos: [...itensCarrinho],
    };

    setPedidos((prev) => {
      const pedidosAtualizados = [novoPedido, ...prev];
      localStorage.setItem("pedidos", JSON.stringify(pedidosAtualizados)); 
      return pedidosAtualizados;
    });
    limparCarrinho();
    alert("Pedido adicionado com sucesso!");
  };

  const excluirPedido = (pedidoId: number) => {
    const pedidosAtualizados = pedidos.filter((pedido) => pedido.id !== pedidoId);
    setPedidos(pedidosAtualizados);
    localStorage.setItem("pedidos", JSON.stringify(pedidosAtualizados));
  };

  const excluirTodosPedidos = () => {
    if (window.confirm("Você tem certeza que deseja excluir todos os pedidos?")) {
      setPedidos([]);
      localStorage.removeItem("pedidos");
    }
  };

  const limparCarrinho = () => {
    setItensCarrinho([]);
  };

  return (
    <CarrinhoContext.Provider
      value={{
        itensCarrinho,
        pedidos,
        adicionarAoCarrinho,
        removerDoCarrinho,
        atualizarQuantidade, 
        limparCarrinho,
        gerarPedido,
        excluirPedido,
        excluirTodosPedidos,
      }}
    >
      {children}
    </CarrinhoContext.Provider>
  );
};

export const useCarrinho = (): CarrinhoContextData => {
  const context = useContext(CarrinhoContext);
  if (!context) {
    throw new Error("useCarrinho deve ser usado dentro de um CarrinhoProvider");
  }
  return context;
};
