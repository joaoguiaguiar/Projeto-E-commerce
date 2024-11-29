import { useRecoilState } from 'recoil';
import { termoDeBuscaState } from '../authState';


export const useBusca = () => {
  const [busca, setBusca] = useRecoilState(termoDeBuscaState);

  return { busca, setBusca };
};
