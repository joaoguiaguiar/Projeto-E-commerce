import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "../pages/Home";
import PaginaBase from "../pages/PaginaBase";
import AreaLogada from "../pages/AreaLogada";
import Pedidos from "../pages/Pedidos";
import Categoria from "../pages/Categoria";

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<PaginaBase />}>
          <Route index element={<HomePage />} />
          <Route path="categorias/:categoriaId" element={<Categoria />} />
          <Route path='/minha-conta' element={<AreaLogada />}>
           <Route path="pedidos" element={<Pedidos/>} /> 
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;
