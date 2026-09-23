'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { USER_PROFILE } from '../data/destinations';

const AuthContext = createContext(null);

export const AUTH_STORAGE_KEY = 'travella_auth_user';

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authModalMode, setAuthModalMode] = useState('login'); // 'login' | 'signup'
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(AUTH_STORAGE_KEY) || sessionStorage.getItem(AUTH_STORAGE_KEY);
      if (stored) {
        setUser(JSON.parse(stored));
      }
    } catch (e) {
      console.error('Failed to read auth state from storage', e);
    }
    setIsInitialized(true);
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
    let loggedInUser;
    if (!email || email.toLowerCase() === USER_PROFILE.email.toLowerCase() || email.toLowerCase().includes('alex')) {
      loggedInUser = { ...USER_PROFILE };
    } else {
      const rawName = email.split('@')[0] || 'Traveler';
      const cleanParts = rawName.split(/[._-]/).filter(Boolean);
      const capitalizedParts = cleanParts.map(p => p.charAt(0).toUpperCase() + p.slice(1).toLowerCase());
      const firstName = capitalizedParts[0] || 'Traveler';
      const fullName = capitalizedParts.join(' ') || `${firstName} Traveler`;
      loggedInUser = {
        name: firstName,
        fullName: fullName,
        email: email.trim(),
        avatar: null,
        savedTripsCount: 0,
        completedTripsCount: 0,
        passportCountry: 'United States',
        membershipTier: 'Travella Explorer Member',
        points: '500 pts',
        preferences: ['Scenic Views', 'Fast WiFi', 'Ocean Panorama']
      };
    }

    persistUser(loggedInUser, rememberMe);
    return loggedInUser;
  };

  const signup = (details) => {
    const { fullName, email, password, rememberMe = true } = details;
    const trimmedName = (fullName || 'Traveler').trim();
    const firstName = trimmedName.split(' ')[0] || 'Traveler';
    const newUser = {
      name: firstName,
      fullName: trimmedName,
      email: email.trim(),
      avatar: null,
      savedTripsCount: 0,
      completedTripsCount: 0,
      passportCountry: 'United States',
      membershipTier: 'Travella Explorer Member',
      points: '500 pts',
      preferences: ['Scenic Views', 'Fast WiFi']
    };

    persistUser(newUser, rememberMe);
    return newUser;
  };

  const demoLogin = () => {
    const demoUser = { ...USER_PROFILE };
    persistUser(demoUser, true);
    return demoUser;
  };

  const guestLogin = () => {
    const guestUser = {
      name: 'Guest',
      fullName: 'Guest Explorer',
      email: 'guest@travella.app',
      avatar: null,
      savedTripsCount: 0,
      completedTripsCount: 0,
      passportCountry: 'United States',
      membershipTier: 'Explorer Guest',
      points: '0 pts',
      preferences: ['Scenic Views', 'Fast WiFi']
    };
    persistUser(guestUser, false);
    return guestUser;
  };

  const socialLogin = (provider) => {
    const isGoogle = provider === 'google';
    const socialUser = {
      name: 'Alex',
      fullName: isGoogle ? 'Alex Morgan (Google)' : 'Alex Morgan (Apple)',
      email: isGoogle ? 'alex.morgan@gmail.com' : 'alex.morgan@icloud.com',
      avatar: USER_PROFILE.avatar,
      savedTripsCount: USER_PROFILE.savedTripsCount,
      completedTripsCount: USER_PROFILE.completedTripsCount,
      passportCountry: 'United States',
      membershipTier: 'Travella Explorer Plus',
      points: '14,850 pts',
      preferences: USER_PROFILE.preferences
    };

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
