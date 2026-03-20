import { useCallback, useEffect, useState } from 'react';
import { authAPI } from '../api';

export const useAuth = () => {
  const [user, setUser] = useState(null);
  const [isInitializing, setIsInitializing] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (!token) {
      localStorage.removeItem('user');
      setIsInitializing(false);
      return;
    }

    let isMounted = true;

    authAPI
      .getProfile()
      .then((response) => {
        if (!isMounted) {
          return;
        }
        setUser(response.data);
        localStorage.setItem('user', JSON.stringify(response.data));
      })
      .catch(() => {
        if (!isMounted) {
          return;
        }
        setUser(null);
        localStorage.removeItem('user');
        localStorage.removeItem('token');
      })
      .finally(() => {
        if (isMounted) {
          setIsInitializing(false);
        }
      });

    return () => {
      isMounted = false;
    };
  }, []);

  const login = useCallback((userData, token) => {
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData));
    localStorage.setItem('token', token);
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    localStorage.removeItem('user');
    localStorage.removeItem('token');
  }, []);

  const isAdmin = user?.role === 'admin';

  return { user, login, logout, isAdmin, isInitializing };
};
