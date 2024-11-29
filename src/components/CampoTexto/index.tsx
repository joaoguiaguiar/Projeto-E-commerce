import React from "react";
import "./CampoTexto.scss";

interface AbCampoTextoProps {
  placeholder: string;
  value: string;
  onChange: (value: string) => void; 
  darkmode?: boolean;
  placeholderAlign?: "left" | "center" | "right";
  onFocus?: () => void;
  onBlur?: () => void; 
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
  const inputClass = darkmode ? "campo-texto dark" : "campo-texto";

  const placeholderStyle = { textAlign: placeholderAlign };

  return (
    <div className="campo-texto-container">
      <input
        type="text"
        className={inputClass}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)} 
        style={placeholderStyle}
        onFocus={onFocus} 
        onBlur={onBlur} 
      />
    </div>
  );
};

export default AbCampoTexto;
