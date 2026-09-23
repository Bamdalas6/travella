import { USER_PROFILE } from '../data/destinations.js';

export const AUTH_STORAGE_KEY = 'travella_auth_user';
export const REGISTERED_ACCOUNTS_KEY = 'travella_registered_accounts';

export const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function normalizeEmail(email) {
  if (!email || typeof email !== 'string') return '';
  return email.trim().toLowerCase();
}

export function isDemoAccount(email) {
  const clean = normalizeEmail(email);
  return (
    !clean ||
    clean === 'alex' ||
    clean === USER_PROFILE.email.toLowerCase() ||
    clean === 'alex@travella.app' ||
    clean === 'alex.morgan@travella.app'
  );
}

export function createDemoUser() {
  return { ...USER_PROFILE };
}

export function createGuestUser() {
  return {
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
}

export function createSocialUser(provider) {
  const isGoogle = provider === 'google';
  return {
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
}

export function createUserFromEmail(email) {
  const cleanEmail = normalizeEmail(email);
  const rawName = cleanEmail.split('@')[0] || 'Traveler';
  const cleanParts = rawName.split(/[._-]/).filter(Boolean);
  const capitalizedParts = cleanParts.map(
    (p) => p.charAt(0).toUpperCase() + p.slice(1).toLowerCase()
  );
  const firstName = capitalizedParts[0] || 'Traveler';
  const fullName =
    capitalizedParts.length > 1
      ? capitalizedParts.join(' ')
      : `${firstName} Traveler`;

  return {
    name: firstName,
    fullName: fullName,
    email: cleanEmail,
    avatar: null,
    savedTripsCount: 0,
    completedTripsCount: 0,
    passportCountry: 'United States',
    membershipTier: 'Travella Explorer Member',
    points: '500 pts',
    preferences: ['Scenic Views', 'Fast WiFi', 'Ocean Panorama']
  };
}

export function createUserFromSignup(details) {
  const { fullName, email } = details;
  const cleanEmail = normalizeEmail(email);
  const trimmedName = (fullName || 'Traveler').trim();
  const firstName = trimmedName.split(' ')[0] || 'Traveler';

  return {
    name: firstName,
    fullName: trimmedName,
    email: cleanEmail,
    avatar: null,
    savedTripsCount: 0,
    completedTripsCount: 0,
    passportCountry: 'United States',
    membershipTier: 'Travella Explorer Member',
    points: '500 pts',
    preferences: ['Scenic Views', 'Fast WiFi']
  };
}

export function validateAuth({
  mode = 'login',
  email = '',
  password = '',
  fullName = '',
  agreedToTerms = false
}) {
  const errors = {};
  const cleanEmail = normalizeEmail(email);

  if (!cleanEmail) {
    errors.email = 'Email address is required';
  } else if (!EMAIL_REGEX.test(cleanEmail)) {
    errors.email = 'Please enter a valid email address';
  }

  if (!password) {
    errors.password = 'Password is required';
  } else if (password.length < 6) {
    errors.password = 'Password must be at least 6 characters';
  }

  if (mode === 'signup') {
    const trimmedName = (fullName || '').trim();
    if (!trimmedName || trimmedName.length < 2) {
      errors.fullName = 'Please enter your full name';
    }
    if (!agreedToTerms) {
      errors.terms = 'Please accept the Terms of Service';
    }
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
}
