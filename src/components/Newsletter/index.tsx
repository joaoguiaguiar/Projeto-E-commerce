import { useState } from 'react';
import Alert from 'react-bootstrap/Alert';
import './Newsletter.scss';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Newsletter = () => {
    const [email, setEmail] = useState('');
    const [showAlert, setShowAlert] = useState(false);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log("E-mail cadastrado:", email);
        setShowAlert(true);
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value);
    }

    return (
        <section className='Newsletter'>
            <div>
                <h6>Fique por dentro das novidades!</h6>
                <p>Receba promoções exclusivas, lançamentos e ofertas especiais de roupas.</p>
            </div>
            <form onSubmit={handleSubmit}>
                <input 
                    type="email"
                    value={email}
                    onChange={handleChange}
                    placeholder="Digite seu e-mail"
                    className="email-input"
                    required
                />
                <button type="submit" className="submit-button">Cadastrar</button>
            </form>

            {showAlert && (
                <Container>
                    <Alert variant="success" onClose={() => setShowAlert(false)} dismissible className='alert'>
                        E-mail cadastrado com sucesso!
                    </Alert>
                </Container>
            )}
        </section>
    );
}

export default Newsletter;
