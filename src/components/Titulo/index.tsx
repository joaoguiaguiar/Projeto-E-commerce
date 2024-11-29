import styled from "styled-components";

interface TituloProps {
  children?: React.ReactNode;
  texto?: string; 
  className?: string;
  id?: string;
}

const TituloEstilizado = styled.h4`
  font-size: 32px;
  text-align: center;
  color: black;
  margin: 16px 0;
`;

const Titulo = ({ children, texto, className, id }: TituloProps) => {
  return (
    <TituloEstilizado className={className} id={id}>
      {children || texto}  
    </TituloEstilizado>
  );
};

export default Titulo;
