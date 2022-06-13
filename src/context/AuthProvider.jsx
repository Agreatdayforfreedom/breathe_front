import axios from 'axios';
import { createContext, useEffect, useState } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const isAuth = async () => {
      try {
        const token = localStorage.getItem('tkn');
        console.log(token);
        if (!token) return setLoading(false);
        const config = {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        };

        const { data } = await axios(
          `${import.meta.env.VITE_API_URL}/auth/profile`,
          config
        );
        //if there is an error in database
        if (data === null) {
          localStorage.removeItem('tkn');
          document.location.reload();
          return;
        }
        setAuth(data);
      } catch (error) {
        console.log(error);
        setAuth({});
      }
      setLoading(false);
    };
    isAuth();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        auth,
        setAuth,
        loading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
