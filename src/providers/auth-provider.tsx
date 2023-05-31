import { PropsWithChildren, createContext, useState } from 'react';

export interface User {
  id: number;
  username: string;
  email: string;
}
export interface UserWithToken {
  access_token: string;
  user: User;
}

type AuthDispatch = (arg: UserWithToken | null) => void;

type AuthValueDispatch = [UserWithToken | null, AuthDispatch];

export const AuthContext = createContext<AuthValueDispatch | null>(null);

export const AuthProvider = (props: PropsWithChildren) => {
  const [auth, setAuth] = useState<UserWithToken | null>(
    JSON.parse(localStorage.getItem('auth') ?? 'null') as UserWithToken,
  );

  const storageSyncedDispatch: AuthDispatch = arg => {
    setAuth(arg);
    localStorage.setItem('auth', JSON.stringify(arg));
  };

  return (
    <AuthContext.Provider value={[auth, storageSyncedDispatch]} {...props} />
  );
};
