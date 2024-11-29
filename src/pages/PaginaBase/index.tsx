import { Outlet } from "react-router-dom"
import BarraNavegacao from "../../components/BarraNavegacao"
import Rodape from "../../components/Rodape"

const PaginaBase = () => {
    return (<main>
        <BarraNavegacao/>
        <Outlet />
        <Rodape />
    </main>)
}

export default PaginaBase