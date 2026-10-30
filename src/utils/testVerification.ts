// Verification script for Diwali Galaxy Wishes core logic
import { validateWish, sanitizeText } from './validation';
import {
  generateWishUrl,
  parseWishFromUrl,
  encodeUnicodeToBase64,
  decodeBase64ToUnicode,
} from './shareUtils';
import { moderateContent } from './communityWishes';
import { WishData } from '../types/wish';

export function runDiagnostics(): { passed: boolean; results: string[] } {
  const results: string[] = [];
  let allPassed = true;

  function assert(condition: boolean, testName: string) {
    if (condition) {
      results.push(`✅ PASS: ${testName}`);
    } else {
      results.push(`❌ FAIL: ${testName}`);
      allPassed = false;
    }
  }

  // 1. Text Sanitization
  const rawHtml = '<script>alert("x")</script>Namaste <b>Diwali</b>!';
  const sanitized = sanitizeText(rawHtml);
  assert(
    !sanitized.includes('<script>') && !sanitized.includes('<b>') && sanitized.includes('Namaste Diwali!'),
    'Sanitizer strips malicious HTML and script tags'
  );

  // 2. Unicode Base64 Round-trip (Bengali & Hindi)
  const bengaliText = 'শুভ দীপাবলি প্রিয় অনন্যা! মা লক্ষ্মীর আশীর্বাদে সবার জীবন আলোয় ভরে উঠুক। 🪔✨';
  const encodedB64 = encodeUnicodeToBase64(bengaliText);
  const decodedB64 = decodeBase64ToUnicode(encodedB64);
  assert(bengaliText === decodedB64, 'Bengali & Unicode emoji Base64 round-trip matches 100%');

  // 3. Validation Logic
  const validWish: WishData = {
    sender: 'Aarav',
    recipient: 'Meera',
    message: 'Wishing you eternal joy and bright beginnings this festive season!',
    category: 'Love',
    theme: 'golden-galaxy',
  };
  const valResult = validateWish(validWish);
  assert(valResult.isValid && Object.keys(valResult.errors).length === 0, 'Valid wish passes validation');

  const emptyWish: Partial<WishData> = {
    sender: '',
    recipient: '',
    message: '',
  };
  const emptyVal = validateWish(emptyWish);
  assert(!emptyVal.isValid && !!emptyVal.errors.recipient && !!emptyVal.errors.sender, 'Empty wish fails validation gracefully');

  // 4. URL Generation & Parsing
  const url = generateWishUrl(validWish);
  const parsedSearch = new URL(url).search;
  const parsedObj = parseWishFromUrl(parsedSearch);
  assert(
    parsedObj.wish !== null &&
      parsedObj.wish.recipient === validWish.recipient &&
      parsedObj.wish.sender === validWish.sender &&
      parsedObj.wish.category === validWish.category,
    'URL generator & parser correctly serializes and deserializes greeting parameters'
  );

  // 5. Content Moderation
  const cleanPrayer = 'May peace and abundance shower upon every home this Diwali.';
  const blockedPhrase = 'This is a scam hate post.';
  assert(moderateContent(cleanPrayer).isSafe === true, 'Peaceful prayer passes moderation filter');
  assert(moderateContent(blockedPhrase).isSafe === false, 'Blocked words trigger friendly moderation filter');

  return { passed: allPassed, results };
}
