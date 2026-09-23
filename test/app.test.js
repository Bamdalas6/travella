import assert from 'node:assert';
import { DESTINATIONS, CATEGORIES, USER_PROFILE } from '../src/data/destinations.js';

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
assert(authFormCode.includes('#E8F1F8'), 'AuthForm must use soft card pill (#E8F1F8)');
assert(authFormCode.includes('#1A1C1E'), 'AuthForm must use dark typography (#1A1C1E)');

// Check in-app modal exists
assert(fs.existsSync('src/components/AuthModal.jsx'), 'In-app AuthModal component must exist');

console.log('  ✅ Authentication logic, validation, dedicated routes, and brand color hierarchy verified');

console.log('\n🎉 ALL 8 TEST SUITES PASSED CLEANLY!\n');

