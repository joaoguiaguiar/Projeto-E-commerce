import React from "react";
import "./CampoTexto.scss";

interface AbCampoTextoProps {
  placeholder: string;
  value: string;
  onChange: (value: string) => void; // Aceita string diretamente
  darkmode?: boolean;
  placeholderAlign?: "left" | "center" | "right";
  onFocus?: () => void; // Novo: Evento ao focar no input
  onBlur?: () => void; // Novo: Evento ao desfocar do input
}

const AbCampoTexto: React.FC<AbCampoTextoProps> = ({
  placeholder,
  value,
  onChange,
  darkmode = false,
  placeholderAlign = "left",
  onFocus,
  onBlur,
}) => {
  // Define a classe baseada no modo escuro
  const inputClass = darkmode ? "campo-texto dark" : "campo-texto";

  // Define o estilo para alinhar o placeholder
  const placeholderStyle = { textAlign: placeholderAlign };

  return (
    <div className="campo-texto-container">
      <input
        type="text"
        className={inputClass}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)} // Extrai o valor diretamente
        style={placeholderStyle}
        onFocus={onFocus} // Passa o evento de foco
        onBlur={onBlur} // Passa o evento de desfoco
      />
    </div>
  );
};

export default AbCampoTexto;
