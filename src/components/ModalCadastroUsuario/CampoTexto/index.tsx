interface CampoTextoProps {
  label: string;
  type: string;
  value: string;
  placeholder: string;
  onChange: (value: string) => void;
  required?: boolean;
}



function CampoTexto(props: CampoTextoProps) {
  const aoDigitado = (evento: React.ChangeEvent<HTMLInputElement>) => {
    props.onChange(evento.target.value); 
  };

  return (
    <div className="mb-3">
      <label htmlFor={props.label} className="form-label">
        {props.label}
      </label>
      <input
        type={props.type}
        className="form-control"
        id={`${props.label}-${Math.random()}`} 
        placeholder={props.placeholder}
        value={props.value}
        onChange={aoDigitado}
        required={props.required || false} 
      />
    </div>
  );
}

export default CampoTexto;


