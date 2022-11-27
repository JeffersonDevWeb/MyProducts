import { useState, useEffect } from 'react';

import api from '../utils/api';
import history from '../utils/history';
import { error } from '../../components/Toasts';

// import delay from '../../utils/delay';

export default function useAuth() {
  const [authenticated, setAuthenticated] = useState(false);
  const [userId, setUserId] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (token) {
      api.defaults.headers.Authorization = `Bearer ${JSON.parse(token)}`;
      setAuthenticated(true);
    }

    setIsLoading(false);
  }, []);

  async function handleLogin(emailArg, passwordArg) {
    try {
      setIsLoading(true);

      const { data } = await api.post('/authenticate', {
        email: emailArg,
        password: passwordArg,
      });

      setUserId(data.user[0].id);
      localStorage.setItem('token', JSON.stringify(data.token));
      api.defaults.headers.Authorization = `Bearer ${data.token}`;
      setAuthenticated(true);
      history.push('/home');
    } catch {
      setIsLoading(false);
      return error('E-mail e/ou Senha Inválidos, tente novamente.');
    }
    setIsLoading(false);
    return ('acessou');
  }

  function handleLogout() {
    setUserId('');
    setAuthenticated(false);
    localStorage.removeItem('token');
    api.defaults.headers.Authorization = undefined;
    history.push('/');
  }

  return {
    authenticated, userId, isLoading, handleLogin, handleLogout,
  };
}
