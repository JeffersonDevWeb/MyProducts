import React, { createContext } from 'react';

import useAuth from './hooks/useAuth';

const Context = createContext();

// eslint-disable-next-line react/prop-types
function AuthProvider({ children }) {
  const {
    authenticated, userId, isLoading, handleLogin, handleLogout,
  } = useAuth();

  return (
    // eslint-disable-next-line react/jsx-no-constructed-context-values
    <Context.Provider value={{
      isLoading, authenticated, handleLogin, handleLogout, userId,
    }}
    >
      {children}
    </Context.Provider>
  );
}

export { Context, AuthProvider };
