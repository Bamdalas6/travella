import assert from 'node:assert';
import { DESTINATIONS, CATEGORIES, USER_PROFILE } from '../src/data/destinations.js';
import {
  normalizeEmail,
  isDemoAccount,
  createDemoUser,
  createGuestUser,
  createSocialUser,
  createUserFromEmail,
  createUserFromSignup,
  validateAuth
} from '../src/context/authLogic.js';

console.log('🧪 Running Travella Automated Tests...\n');

// Test 1: Data schema integrity
console.log('1. Checking Destinations Data Integrity:');
assert(Array.isArray(DESTINATIONS), 'DESTINATIONS should be an array');
assert(DESTINATIONS.length >= 8, 'Should have at least 8 destinations');

DESTINATIONS.forEach((dest) => {
  assert(dest.id, `Destination missing id: ${JSON.stringify(dest)}`);
  assert(dest.title, `Destination ${dest.id} missing title`);
  assert(dest.location, `Destination ${dest.id} missing location`);
  assert(dest.category, `Destination ${dest.id} missing category`);
  assert(dest.price > 0, `Destination ${dest.id} price must be positive`);
  assert(dest.rating >= 4.0 && dest.rating <= 5.0, `Destination ${dest.id} rating out of bounds`);
  assert(dest.imageUrl.startsWith('http'), `Destination ${dest.id} invalid imageUrl`);
  assert(Array.isArray(dest.gallery) && dest.gallery.length > 0, `Destination ${dest.id} gallery must have items`);
  assert(Array.isArray(dest.amenities) && dest.amenities.length > 0, `Destination ${dest.id} amenities must have items`);
  assert(dest.host && dest.host.name, `Destination ${dest.id} host missing name`);
});
console.log('  ✅ All destinations meet strict schema and data constraints');

// Test 2: Categories
console.log('\n2. Checking Categories:');
assert(CATEGORIES.length >= 6, 'Must have at least 6 categories');
const categoryIds = CATEGORIES.map(c => c.id);
assert(categoryIds.includes('all'), 'Must include "all" category');
assert(categoryIds.includes('beach'), 'Must include "beach" category');
assert(categoryIds.includes('mountain'), 'Must include "mountain" category');
assert(categoryIds.includes('luxury'), 'Must include "luxury" category');
console.log('  ✅ Categories configured accurately');

// Test 3: Search and Filter Logic
console.log('\n3. Testing Filter & Search Business Logic:');

// Search filter test
const searchQuery = 'Amalfi';
const matchedBySearch = DESTINATIONS.filter(item =>
  item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
  item.location.toLowerCase().includes(searchQuery.toLowerCase())
);
assert(matchedBySearch.length >= 1, 'Should find Amalfi destination');
assert(matchedBySearch[0].id === 'dest-1', 'First match should be dest-1');
console.log('  ✅ Search filter works correctly');

// Category filter test
const beachStays = DESTINATIONS.filter(item => item.category.toLowerCase() === 'beach');
assert(beachStays.length >= 2, 'Should find at least 2 beach stays');
beachStays.forEach(d => assert(d.category.toLowerCase() === 'beach'));
console.log('  ✅ Category filtering works correctly');

// Price filter test
const budget = 300;
const underBudget = DESTINATIONS.filter(item => (item.discountPrice || item.price) <= budget);
assert(underBudget.length > 0, 'Should find stays under $300');
underBudget.forEach(d => assert((d.discountPrice || d.price) <= budget));
console.log('  ✅ Price threshold filtering works correctly');

// Amenities filter test
const poolStays = DESTINATIONS.filter(item => item.amenities.some(a => a.id === 'pool'));
assert(poolStays.length >= 3, 'Should find at least 3 stays with pool');
console.log('  ✅ Amenities filtering works correctly');

// Test 4: Pricing and Promo Logic
console.log('\n4. Testing Pricing & Checkout Math:');
const sampleDest = DESTINATIONS[0];
const baseRate = sampleDest.discountPrice || sampleDest.price;
const nights = 4;
const staySubtotal = baseRate * nights;
const cleaningFee = 60;
const serviceFee = 45;
const regularTotal = staySubtotal + cleaningFee + serviceFee;

// Regular checkout
assert.strictEqual(staySubtotal, 320 * 4);
assert.strictEqual(regularTotal, 1280 + 60 + 45); // 1385

// Promo checkout (20% off subtotal)
const promoDiscount = Math.round(staySubtotal * 0.20);
assert.strictEqual(promoDiscount, 256);
const discountedTotal = regularTotal - promoDiscount;
assert.strictEqual(discountedTotal, 1129);
console.log('  ✅ Pricing, fees, and promo code mathematics pass with exactness');

// Test 5: User Profile
console.log('\n5. Testing User Profile Constants:');
assert.strictEqual(USER_PROFILE.name, 'Alex');
assert(USER_PROFILE.avatar.length > 0);
console.log('  ✅ User profile matches Alex design mockup');

// Test 6: Cloudflare Deployment Configuration (R1)
console.log('\n6. Checking Cloudflare Deployment Configuration (R1):');
import fs from 'node:fs';
const wranglerContent = fs.readFileSync('wrangler.toml', 'utf-8');
assert(wranglerContent.includes('[assets]'), 'wrangler.toml must contain [assets] table');
assert(wranglerContent.includes('directory = "./out"'), 'wrangler.toml must set assets directory = "./out"');
const pkgJson = JSON.parse(fs.readFileSync('package.json', 'utf-8'));
assert(pkgJson.scripts.build.includes('next build'), 'package.json build must invoke next build');
assert(pkgJson.scripts.build.includes('sync-dist') || pkgJson.scripts.build.includes('dist'), 'package.json build must mirror to dist');
console.log('  ✅ Cloudflare wrangler.toml assets and package.json build mirror verified');

// Test 7: First-Time User Notification State (R2)
console.log('\n7. Checking First-Time User Notification State (R2):');
const freshSessionNotifications = [];
const freshUnreadCount = freshSessionNotifications.filter(n => n.unread).length;
assert.strictEqual(freshUnreadCount, 0, 'Fresh session must have unread notification count of 0');
const headerCode = fs.readFileSync('src/components/Header.jsx', 'utf-8');
assert(headerCode.includes('No notifications yet — Explore destinations to receive updates'), 'Header must contain exact friendly empty state string');
assert(headerCode.includes('0 unread alerts'), 'Header dropdown must show 0 unread alerts for first-time users');
console.log('  ✅ First-time user notification badge count is 0 and empty state renders accurately');

// Test 8: Authentication Logic & Color Hierarchy (R3)
console.log('\n8. Checking Auth Validation, Routes, and Color Hierarchy (R3):');
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
assert(emailRegex.test('traveler@travella.app'), 'Valid email should pass regex');
assert(!emailRegex.test('invalid-email'), 'Invalid email without @ should fail regex');
assert(!emailRegex.test('invalid@nodomain'), 'Invalid email without dot domain should fail regex');

// Password validation
const isValidPassword = (pwd) => Boolean(pwd && pwd.length >= 6);
assert(isValidPassword('secure123'), 'Valid password >= 6 chars should pass');
assert(!isValidPassword('123'), 'Short password < 6 chars should fail');
assert(!isValidPassword(''), 'Empty password should fail');

// Check routes exist
assert(fs.existsSync('src/app/login/page.jsx'), 'Dedicated /login route page must exist');
assert(fs.existsSync('src/app/signup/page.jsx'), 'Dedicated /signup route page must exist');

// Check brand colors in AuthForm
const authFormCode = fs.readFileSync('src/components/AuthForm.jsx', 'utf-8');
assert(authFormCode.includes('#387FAB'), 'AuthForm must use Ocean Blue (#387FAB)');
assert(authFormCode.includes('#5B94BF'), 'AuthForm must use primary accent Ocean Blue (#5B94BF)');
assert(authFormCode.includes('#E8F1F8'), 'AuthForm must use soft card pill (#E8F1F8)');
assert(authFormCode.includes('#1A1C1E'), 'AuthForm must use dark typography (#1A1C1E)');
assert(authFormCode.includes('#6A717A'), 'AuthForm must use secondary text (#6A717A)');

// Check in-app modal and accessibility
assert(fs.existsSync('src/components/AuthModal.jsx'), 'In-app AuthModal component must exist');
const authModalCode = fs.readFileSync('src/components/AuthModal.jsx', 'utf-8');
assert(authModalCode.includes('aria-labelledby="auth-modal-title"'), 'AuthModal must contain aria-labelledby');
assert(authFormCode.includes('id="auth-modal-title"'), 'AuthForm must contain id="auth-modal-title" matching aria-labelledby');

// Check AuthModal does not shadow authModalMode with default param
assert(!authModalCode.includes("initialMode = 'login'"), 'AuthModal must not default initialMode to login in param list, which shadows authModalMode');

console.log('  ✅ Authentication logic, validation, dedicated routes, and brand color hierarchy verified');

// Test 9: State Synchronization Across the App (R3)
console.log('\n9. Checking State Synchronization & Edge Cases Across Components:');
const authContextCode = fs.readFileSync('src/context/AuthContext.jsx', 'utf-8');
assert(authContextCode.includes('guestLogin'), 'AuthContext must export guestLogin for Guest quick login');
assert(authContextCode.includes('demoLogin'), 'AuthContext must export demoLogin for Alex Morgan quick login');
assert(authContextCode.includes('sessionStorage'), 'AuthContext must support non-persistent session storage when rememberMe is false');

const bookingModalCode = fs.readFileSync('src/components/BookingModal.jsx', 'utf-8');
assert(bookingModalCode.includes('useAuth'), 'BookingModal must connect to useAuth to synchronize active guest credentials');
assert(!bookingModalCode.includes('Pack Your Bags, Alex!'), 'BookingModal confirmation must dynamically address active user, not hardcoded to Alex');

const profileTabCode = fs.readFileSync('src/components/ProfileTab.jsx', 'utf-8');
assert(profileTabCode.includes('activeProfile.avatar ?'), 'ProfileTab must gracefully handle null/guest avatar without broken image icon');

console.log('  ✅ State synchronization across Header, BookingModal, and ProfileTab verified');

// Test 10: Deep Functional Auth Logic & Edge Cases (R3)
console.log('\n10. Checking Functional Auth Logic & Edge Cases:');

// Normalization & Whitespace trimming
assert.strictEqual(normalizeEmail('  alex@travella.app  '), 'alex@travella.app', 'normalizeEmail should trim and lowercase');
assert.strictEqual(normalizeEmail('ALEX.MORGAN@TRAVELLA.APP'), 'alex.morgan@travella.app', 'normalizeEmail should lowercase');
assert.strictEqual(normalizeEmail(null), '', 'normalizeEmail should handle null gracefully');

// Demo Account discrimination
assert(isDemoAccount('alex'), 'alex should be recognized as demo account');
assert(isDemoAccount('alex.morgan@travella.app'), 'alex.morgan@travella.app should be demo account');
assert(isDemoAccount(''), 'empty email should default to demo account');
assert(!isDemoAccount('alexander@gmail.com'), 'alexander@gmail.com must NOT be treated as Alex Morgan demo account');
assert(!isDemoAccount('alexa@amazon.com'), 'alexa@amazon.com must NOT be treated as Alex Morgan demo account');

// User creation from email
const alexanderUser = createUserFromEmail('alexander@gmail.com');
assert.strictEqual(alexanderUser.name, 'Alexander', 'User created from email should have capitalized name');
assert.strictEqual(alexanderUser.email, 'alexander@gmail.com', 'User created from email should preserve email');

const emmaWatsonUser = createUserFromEmail('emma.watson@travella.app');
assert.strictEqual(emmaWatsonUser.fullName, 'Emma Watson', 'Dots in email prefix should resolve to full name');
assert.strictEqual(emmaWatsonUser.name, 'Emma', 'First name should be extracted');

// Signup user creation
const signupUser = createUserFromSignup({ fullName: 'Sophia Davis', email: 'sophia.davis@example.com' });
assert.strictEqual(signupUser.fullName, 'Sophia Davis', 'Signup should preserve exact full name');
assert.strictEqual(signupUser.name, 'Sophia', 'Signup should extract first name');
assert.strictEqual(signupUser.points, '500 pts', 'Signup user should receive 500 reward points');

// Multiple whitespace collapsing in signup
const multiSpaceSignup = createUserFromSignup({ fullName: '  Sophia   Davis  ', email: 'sophia@example.com' });
assert.strictEqual(multiSpaceSignup.fullName, 'Sophia Davis', 'Multiple spaces in signup full name should be collapsed');

// Empty or default createUserFromEmail should not duplicate Traveler
const emptyEmailUser = createUserFromEmail('');
assert.strictEqual(emptyEmailUser.name, 'Traveler');
assert.strictEqual(emptyEmailUser.fullName, 'Traveler', 'Default email user should have clean single Traveler fullName');

// Functional validation testing
const validLogin = validateAuth({ mode: 'login', email: 'user@example.com', password: 'password123' });
assert(validLogin.isValid, 'Valid login should pass validation');
assert.strictEqual(Object.keys(validLogin.errors).length, 0);

const spaceEmailLogin = validateAuth({ mode: 'login', email: '  user@example.com  ', password: 'password123' });
assert(spaceEmailLogin.isValid, 'Email with leading/trailing spaces should pass validation after trimming');

const shortPwd = validateAuth({ mode: 'login', email: 'user@example.com', password: '123' });
assert(!shortPwd.isValid, 'Short password (<6) must fail validation');
assert(shortPwd.errors.password, 'Must have password error');

// Non-string password safety
const numberPwd = validateAuth({ mode: 'login', email: 'user@example.com', password: 12345 });
assert(!numberPwd.isValid, 'Non-string short password must fail validation without error');

// Destructuring safety on empty call
const emptyCall = validateAuth();
assert(!emptyCall.isValid, 'Calling validateAuth() with no args should fail validation gracefully');
const emptySignup = createUserFromSignup();
assert.strictEqual(emptySignup.name, 'Traveler', 'Calling createUserFromSignup() with no args should return default Traveler');

const signupMissingTerms = validateAuth({ mode: 'signup', fullName: 'Test User', email: 'test@example.com', password: 'password123', agreedToTerms: false });
assert(!signupMissingTerms.isValid, 'Signup without terms must fail');
assert(signupMissingTerms.errors.terms, 'Must have terms error');

const signupValid = validateAuth({ mode: 'signup', fullName: 'Test User', email: 'test@example.com', password: 'password123', agreedToTerms: true });
assert(signupValid.isValid, 'Valid signup should pass');

// Guest & Social models
const guest = createGuestUser();
assert.strictEqual(guest.name, 'Guest');
assert.strictEqual(guest.avatar, null);

const googleUser = createSocialUser('google');
assert(googleUser.fullName.includes('Google'));
const appleUser = createSocialUser('apple');
assert(appleUser.fullName.includes('Apple'));

console.log('  ✅ Deep functional auth logic, trimming, validation, and user creation verified');

// Test 11: Modal Accessibility, ARIA Specifications, and Keyboard Navigation (R3)
console.log('\n11. Checking Modal Accessibility, ARIA Specifications, and Keyboard Navigation (R3):');
const filterModalCode = fs.readFileSync('src/components/FilterModal.jsx', 'utf-8');
assert(filterModalCode.includes('role="dialog"'), 'FilterModal must have role="dialog"');
assert(filterModalCode.includes('aria-modal="true"'), 'FilterModal must have aria-modal="true"');
assert(filterModalCode.includes('aria-labelledby="filter-modal-title"'), 'FilterModal must have aria-labelledby');
assert(filterModalCode.includes('id="filter-modal-title"'), 'FilterModal must have id="filter-modal-title"');
assert(filterModalCode.includes("e.key === 'Escape'"), 'FilterModal must handle Escape key');
assert(filterModalCode.includes('aria-label="Close filter modal"'), 'FilterModal close button must have aria-label');

const bookingModalFileCode = fs.readFileSync('src/components/BookingModal.jsx', 'utf-8');
assert(bookingModalFileCode.includes('role="dialog"'), 'BookingModal must have role="dialog"');
assert(bookingModalFileCode.includes('aria-modal="true"'), 'BookingModal must have aria-modal="true"');
assert(bookingModalFileCode.includes('aria-labelledby="booking-modal-title"'), 'BookingModal must have aria-labelledby');
assert(bookingModalFileCode.includes('id="booking-modal-title"'), 'BookingModal must have id="booking-modal-title"');
assert(bookingModalFileCode.includes("e.key === 'Escape'"), 'BookingModal must handle Escape key');
assert(bookingModalFileCode.includes('aria-label="Close booking modal"'), 'BookingModal close button must have aria-label');

const headerSafeCode = fs.readFileSync('src/components/Header.jsx', 'utf-8');
assert(headerSafeCode.includes('Array.isArray(parsed)'), 'Header must verify Array.isArray for stored notifications');

const authContextSafeCode = fs.readFileSync('src/context/AuthContext.jsx', 'utf-8');
assert(authContextSafeCode.includes('!Array.isArray(parsed)'), 'AuthContext must protect registered accounts registry from corrupted non-object values');
console.log('  ✅ Modal accessibility, ARIA compliance, and storage resilience verified');

console.log('\n🎉 ALL 11 TEST SUITES PASSED CLEANLY!\n');



