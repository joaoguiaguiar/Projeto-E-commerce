import { Link, Outlet } from "react-router-dom"

import './AreaLogada.scss'
import styled from "styled-components"



const ContainerTitulo = styled.div`
height: 40vh ;
background-color: #021526;
padding: 8.5rem;
`



const TituloAreaLogada = styled.h1`
color: white;
text-align: center ;
`


const AreaLogada = () => {
    return (<>

      <ContainerTitulo>
      <TituloAreaLogada className="AreaLogada__titulo">Minha conta</TituloAreaLogada>
      </ContainerTitulo>
       
        <section className="AreaLogada">
            <div className="menu">
                <ul className="navegacao">
                    <li className="item">
                        <Link to="/minha-conta/pedidos">Pedidos</Link>
                    </li>
                    <li className="item">
                        <Link to="/area-logada/dados">Seus dados</Link>
                    </li>
                </ul>
            </div>
            <div className="conteudo">
                <Outlet />
            </div>
        </section>
    </>)
}

export default AreaLogada