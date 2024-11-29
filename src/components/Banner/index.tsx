import { ReactNode } from "react";
import './Banner.scss'
import styled from "styled-components";



interface BannerProps {
    titulo?: string
    subtitulo?: string
    children?: ReactNode
}


const Container = styled.div`
margin-top: 2rem;
`

const Banner = ({ titulo, subtitulo, children }: BannerProps) => {


    return (
        <section className="banner-principal">


            <Container>

            <h2>{titulo}</h2>
            <h3>{subtitulo}</h3>

            {children}
     
            </Container>
           

        </section>
    )


}


export default Banner