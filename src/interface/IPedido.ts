import { IProduto } from "./IProduto";

export interface IPedido {
  id: number; 
  data: string; 
  total: number;
  entrega: string; 
  produtos: IProduto[];
}
