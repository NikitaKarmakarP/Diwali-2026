// Unicode & URL safety test script
function toBase64Unicode(str) {
  const utf8Bytes = encodeURIComponent(str).replace(/%([0-9A-F]{2})/g, (_, p1) =>
    String.fromCharCode(parseInt(p1, 16))
  );
  return Buffer.from(utf8Bytes, 'binary').toString('base64').replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
}

function fromBase64Unicode(b64) {
  let base64 = b64.replace(/-/g, '+').replace(/_/g, '/');
  while (base64.length % 4) base64 += '=';
  const binary = Buffer.from(base64, 'base64').toString('binary');
  const percentEncoded = Array.prototype.map
    .call(binary, (c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
    .join('');
  return decodeURIComponent(percentEncoded);
}

const testStrings = [
  'শুভ দীপাবলি প্রিয় রাহুল ও অনন্যা! 🪔✨',
  'शुभ दीपावली और सुख समृद्धि! 🪔',
  'Universal Diwali Blessings across the cosmic starlight!'
];

let allPassed = true;
for (const s of testStrings) {
  const encoded = toBase64Unicode(s);
  const decoded = fromBase64Unicode(encoded);
  if (decoded === s) {
    console.log(`✅ MATCH [${s.slice(0, 20)}...]`);
  } else {
    console.error(`❌ MISMATCH: expected "${s}", got "${decoded}"`);
    allPassed = false;
  }
}

if (!allPassed) {
  process.exit(1);
} else {
  console.log('✅ ALL UNICODE ROUND-TRIP TESTS PASSED!');
}
