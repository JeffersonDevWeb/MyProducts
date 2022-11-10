import { useState, useEffect } from 'react';

import api from '../utils/api';
import history from '../utils/history';

// import delay from '../../utils/delay';

export default function useAuth() {
  const [authenticated, setAuthenticated] = useState(false);
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
    const { data } = await api.post('/authenticate', {
      email: emailArg,
      password: passwordArg,
    });

    localStorage.setItem('token', JSON.stringify(data.token));
    api.defaults.headers.Authorization = `Bearer ${data.token}`;
    setAuthenticated(true);
    history.push('/home');

    return 'Acessou';
  }

  function handleLogout() {
    setAuthenticated(false);
    localStorage.removeItem('token');
    api.defaults.headers.Authorization = undefined;
    history.push('/');
  }

  return {
    authenticated, isLoading, handleLogin, handleLogout,
  };
}
