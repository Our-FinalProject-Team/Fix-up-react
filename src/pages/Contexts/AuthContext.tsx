//  this file is for authentication context,
//  it provides a way to manage user authentication state across the application. 
//  It includes functions for logging in and out,
//  as well as a state variable to track whether the user is currently logged in.
//  The context is created using React's createContext and useContext hooks,
//  and it is provided to the rest of the application through the AuthProvider component.


import React, { createContext, useState, useContext } from 'react';
const AuthContext = createContext<any | null>(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {

  const [token, setToken] = useState(localStorage.getItem('userToken'));
  const [userRole, setUserRole] = useState(localStorage.getItem('userRole'));

  const login = (newToken:string, newUserRole:string) => {
    localStorage.setItem('userToken', newToken); 
    localStorage.setItem('userRole', newUserRole);
    setToken(newToken); 
    setUserRole(newUserRole);
  };

  const logout = () => {
    localStorage.removeItem('userToken'); 
    localStorage.removeItem('userRole');
    setToken(null); 
    setUserRole(null);
  };

  const isLoggedIn = !!token;

  return (
    <AuthContext.Provider value={{ isLoggedIn, token, userRole, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};