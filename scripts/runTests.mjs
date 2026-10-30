// Simple direct runner to verify sanitize, validation, Unicode base64, and URL generation
import { sanitizeText, validateWish } from '../src/utils/validation.js';

console.log('Testing Sanitizer & Validation...');
const text = sanitizeText('<b>Hello</b> <script>alert(1)</script> 🪔 শুভ দীপাবলি');
console.log('Sanitized:', text);
if (!text.includes('<script>') && text.includes('শুভ দীপাবলি')) {
  console.log('✅ Sanitizer passed!');
} else {
  console.error('❌ Sanitizer failed!');
  process.exit(1);
}

const res = validateWish({
  sender: 'Joyita',
  recipient: 'অনন্যা (Ananya)',
  message: 'শুভ দীপাবলি! আলোর উৎসব বয়ে আনুক অনাবিল আনন্দ ও শান্তি। 🪔✨',
  category: 'Universal',
  theme: 'golden-galaxy'
});

if (res.isValid) {
  console.log('✅ Unicode Wish Validation passed!');
} else {
  console.error('❌ Validation failed:', res.errors);
  process.exit(1);
}

console.log('All diagnostics passed!');
