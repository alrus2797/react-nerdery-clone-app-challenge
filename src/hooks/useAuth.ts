import { useContext, useMemo } from 'react';
import { AuthContext, UserWithToken } from '../providers/auth-provider';
import axios from 'axios';
import { API_BASE_URL } from '../shared/constants/api';
import { SignupInputs } from '../shared/types/signup-inputs';
import { LoginInputs } from '../shared/types/auth-inputs';

const API_LOGIN_URL = `${API_BASE_URL}/login`;
const API_REGISTER_URL = `${API_BASE_URL}/register`;

export const useAuth = () => {
  const authConsumer = useContext(AuthContext);
  if (!authConsumer) throw Error('useAuth must be inside AuthProvider');
  const [auth, setAuth] = authConsumer;
  const isLogged = useMemo(() => !!auth, [auth]);

  const login = (payload: LoginInputs) => {
    return axios
      .post<UserWithToken>(`${API_LOGIN_URL}`, payload)
      .then(({ data }) => {
        setAuth(data);
      });
  };

  const logout = () => {
    setAuth(null);
  };

  const register = (payload: SignupInputs) => {
    return axios
      .post<UserWithToken>(`${API_REGISTER_URL}`, payload)
      .then(({ data }) => setAuth(data));
  };

  return { isLogged, login, logout, register, auth };
};
