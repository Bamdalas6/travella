'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  AUTH_STORAGE_KEY,
  REGISTERED_ACCOUNTS_KEY,
  normalizeEmail,
  isDemoAccount,
  createDemoUser,
  createGuestUser,
  createSocialUser,
  createUserFromEmail,
  createUserFromSignup
} from './authLogic';

const AuthContext = createContext(null);

export { AUTH_STORAGE_KEY, REGISTERED_ACCOUNTS_KEY };

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authModalMode, setAuthModalMode] = useState('login'); // 'login' | 'signup'
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    try {
      const stored =
        localStorage.getItem(AUTH_STORAGE_KEY) ||
        sessionStorage.getItem(AUTH_STORAGE_KEY);
      if (stored) {
        setUser(JSON.parse(stored));
      }
    } catch (e) {
      console.error('Failed to read auth state from storage', e);
    }
    setIsInitialized(true);

    // Cross-tab storage synchronization
    const handleStorageChange = (e) => {
      if (e.key === AUTH_STORAGE_KEY) {
        if (e.newValue) {
          try {
            setUser(JSON.parse(e.newValue));
          } catch (err) {
            setUser(null);
          }
        } else {
          setUser(null);
        }
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  const persistUser = (userData, remember = true) => {
    setUser(userData);
    try {
      if (remember) {
        localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(userData));
        sessionStorage.removeItem(AUTH_STORAGE_KEY);
      } else {
        sessionStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(userData));
        localStorage.removeItem(AUTH_STORAGE_KEY);
      }
    } catch (e) {
      console.error('Failed to persist auth state', e);
    }
    setIsAuthModalOpen(false);
  };

  const login = (credentials) => {
    const { email, password, rememberMe = true } = credentials;
    const cleanEmail = normalizeEmail(email);
    let loggedInUser;

    if (isDemoAccount(cleanEmail)) {
      loggedInUser = createDemoUser();
    } else {
      // Check if user previously registered in this browser
      let registeredMap = {};
      try {
        const storedMap = localStorage.getItem(REGISTERED_ACCOUNTS_KEY);
        if (storedMap) registeredMap = JSON.parse(storedMap);
      } catch (err) {
        // ignore
      }

      if (registeredMap[cleanEmail]) {
        loggedInUser = { ...registeredMap[cleanEmail] };
      } else {
        loggedInUser = createUserFromEmail(cleanEmail);
      }
    }

    persistUser(loggedInUser, rememberMe);
    return loggedInUser;
  };

  const signup = (details) => {
    const { fullName, email, password, rememberMe = true } = details;
    const cleanEmail = normalizeEmail(email);
    const newUser = createUserFromSignup({ fullName, email: cleanEmail });

    // Store in registered accounts registry for future login recall
    try {
      let registeredMap = {};
      const storedMap = localStorage.getItem(REGISTERED_ACCOUNTS_KEY);
      if (storedMap) registeredMap = JSON.parse(storedMap);
      registeredMap[cleanEmail] = newUser;
      localStorage.setItem(REGISTERED_ACCOUNTS_KEY, JSON.stringify(registeredMap));
    } catch (err) {
      // ignore
    }

    persistUser(newUser, rememberMe);
    return newUser;
  };

  const demoLogin = () => {
    const demoUser = createDemoUser();
    persistUser(demoUser, true);
    return demoUser;
  };

  const guestLogin = () => {
    const guestUser = createGuestUser();
    persistUser(guestUser, false);
    return guestUser;
  };

  const socialLogin = (provider) => {
    const socialUser = createSocialUser(provider);
    persistUser(socialUser, true);
    return socialUser;
  };

  const logout = () => {
    setUser(null);
    try {
      localStorage.removeItem(AUTH_STORAGE_KEY);
      sessionStorage.removeItem(AUTH_STORAGE_KEY);
    } catch (e) {
      console.error('Failed to remove auth state', e);
    }
  };

  const openAuthModal = (mode = 'login') => {
    setAuthModalMode(mode);
    setIsAuthModalOpen(true);
  };

  const closeAuthModal = () => {
    setIsAuthModalOpen(false);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: Boolean(user),
        isInitialized,
        login,
        signup,
        demoLogin,
        guestLogin,
        socialLogin,
        logout,
        isAuthModalOpen,
        authModalMode,
        setAuthModalMode,
        openAuthModal,
        closeAuthModal
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    return {
      user: null,
      isAuthenticated: false,
      isInitialized: true,
      login: () => {},
      signup: () => {},
      demoLogin: () => {},
      guestLogin: () => {},
      socialLogin: () => {},
      logout: () => {},
      isAuthModalOpen: false,
      authModalMode: 'login',
      setAuthModalMode: () => {},
      openAuthModal: () => {},
      closeAuthModal: () => {}
    };
  }
  return context;
}
