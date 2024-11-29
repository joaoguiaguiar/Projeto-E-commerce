import { atom } from 'recoil';
import { AuthState } from '../interface/IAutheState';

export const authState = atom<AuthState>({
    key: 'authState',
    default: {
        isAuthenticated: false,
        user: null, 
    },
});


export const cepAtom = atom<string>({
    key: 'cepState',
    default: '',
  });
  
  export const enderecoAtom = atom<string>({
    key: 'enderecoState',
    default: '',
  });

export const termoDeBuscaState = atom<string>({
  key: 'termoDeBuscaState',  
  default: '',  
});