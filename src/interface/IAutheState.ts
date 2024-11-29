export interface AuthState {
    isAuthenticated: boolean;
    user: {
        nome: string;
        email: string;
        cep: number;
        endereco: string;
        password: string;
    } | null; 
}
