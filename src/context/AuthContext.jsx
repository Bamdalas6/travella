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
      const stored = localStorage.getItem(AUTH_STORAGE_KEY);
      if (stored) {
        setUser(JSON.parse(stored));
      }
    } catch (e) {
      console.error('Failed to read auth state from localStorage', e);
    }
    setIsInitialized(true);
  }, []);

  const login = (credentials) => {
    const { email, password, rememberMe } = credentials;
    let loggedInUser;
    if (!email || email.toLowerCase() === USER_PROFILE.email.toLowerCase() || email.toLowerCase().includes('alex')) {
      loggedInUser = { ...USER_PROFILE };
    } else {
      const namePart = email.split('@')[0] || 'Traveler';
      const displayName = namePart.charAt(0).toUpperCase() + namePart.slice(1);
      loggedInUser = {
        name: displayName,
        fullName: `${displayName} Traveler`,
        email: email,
        avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=300&q=80',
        savedTripsCount: 0,
        completedTripsCount: 0,
        passportCountry: 'United States',
        membershipTier: 'Travella Explorer Member',
        points: '500 pts',
        preferences: ['Scenic Views', 'Fast WiFi', 'Ocean Panorama']
      };
    }

    setUser(loggedInUser);
    try {
      localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(loggedInUser));
    } catch (e) {
      console.error('Failed to persist auth state', e);
    }
    setIsAuthModalOpen(false);
    return loggedInUser;
  };

  const signup = (details) => {
    const { fullName, email, password, rememberMe } = details;
    const trimmedName = (fullName || 'Traveler').trim();
    const firstName = trimmedName.split(' ')[0] || 'Traveler';
    const newUser = {
      name: firstName,
      fullName: trimmedName,
      email: email.trim(),
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=300&q=80',
      savedTripsCount: 0,
      completedTripsCount: 0,
      passportCountry: 'United States',
      membershipTier: 'Travella Explorer Member',
      points: '500 pts',
      preferences: ['Scenic Views', 'Fast WiFi']
    };

    setUser(newUser);
    try {
      localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(newUser));
    } catch (e) {
      console.error('Failed to persist auth state', e);
    }
    setIsAuthModalOpen(false);
    return newUser;
  };

  const demoLogin = () => {
    const demoUser = { ...USER_PROFILE };
    setUser(demoUser);
    try {
      localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(demoUser));
    } catch (e) {
      console.error('Failed to persist auth state', e);
    }
    setIsAuthModalOpen(false);
    return demoUser;
  };

  const socialLogin = (provider) => {
    const isGoogle = provider === 'google';
    const socialUser = {
      name: isGoogle ? 'Alex' : 'Alex',
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

    setUser(socialUser);
    try {
      localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(socialUser));
    } catch (e) {
      console.error('Failed to persist auth state', e);
    }
    setIsAuthModalOpen(false);
    return socialUser;
  };

  const logout = () => {
    setUser(null);
    try {
      localStorage.removeItem(AUTH_STORAGE_KEY);
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
