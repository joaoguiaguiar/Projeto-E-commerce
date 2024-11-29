import { useEffect } from "react";
import { useRecoilState } from "recoil";
import { authState } from "../authState"; 

export const useAuth = () => {
  const [auth, setAuth] = useRecoilState(authState); 

  useEffect(() => {
    const userToken = localStorage.getItem("user_token");
    const usersStorage = localStorage.getItem("users_bd");

    if (userToken && usersStorage) {
      const userInfo = JSON.parse(userToken);
      const users = JSON.parse(usersStorage);
      const foundUser = users.find((user: { email: string }) => user.email === userInfo.email);

      if (foundUser) {
        setAuth({ user: foundUser, isAuthenticated: true }); 
      }
    }
  }, [setAuth]);

  const signin = (email: string, senha: string) => {
    const usersStorage = JSON.parse(localStorage.getItem("users_bd") || "[]");
    const foundUser = usersStorage.find((user: { email: string }) => user.email === email);

    if (foundUser && foundUser.senha === senha) {
      const token = Math.random().toString(36).substring(2);
      localStorage.setItem("user_token", JSON.stringify({ email, token }));
      setAuth({ user: foundUser, isAuthenticated: true }); 
      return;
    }
    return "E-mail ou senha incorretos";
  };

  const signup = ( nome: string,  email: string,cep: string,  endereco: string  ,  senha: string ) => {
    const usersStorage = JSON.parse(localStorage.getItem("users_bd") || "[]");
    const foundUser = usersStorage.find((user: { email: string }) => user.email === email);

    if (foundUser) {
      return "Usuário já cadastrado";
    }

    const newUser = { nome, email, cep , endereco,senha  };
    localStorage.setItem("users_bd", JSON.stringify([...usersStorage, newUser]));
    return "Cadastro realizado com sucesso!";
  };

  const signout = () => {
    setAuth({ user: null, isAuthenticated: false }); 
    localStorage.removeItem("user_token");
  };



  return { auth, signin, signup, signout };
};
