import { WishCategory, WishData, WishTheme } from '../types/wish';
import { sanitizeText, VALID_CATEGORIES, VALID_THEMES } from './validation';

export function getBaseUrl(): string {
  if (typeof window !== 'undefined') {
    return window.location.origin;
  }
  return import.meta.env.VITE_APP_URL || 'https://diwali-galaxy-wishes.web.app';
}

/**
 * Encodes a Unicode string to a URL-safe Base64 representation.
 */
export function encodeUnicodeToBase64(str: string): string {
  try {
    const utf8Bytes = encodeURIComponent(str).replace(/%([0-9A-F]{2})/g, (_, p1) =>
      String.fromCharCode(parseInt(p1, 16))
    );
    return btoa(utf8Bytes).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
  } catch (e) {
    console.error('Base64 encoding error:', e);
    return '';
  }
}

/**
 * Decodes a URL-safe Base64 string back to its original Unicode string.
 */
export function decodeBase64ToUnicode(b64: string): string {
  try {
    let base64 = b64.replace(/-/g, '+').replace(/_/g, '/');
    while (base64.length % 4) {
      base64 += '=';
    }
    const binary = atob(base64);
    const percentEncoded = Array.prototype.map
      .call(binary, (c: string) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
      .join('');
    return decodeURIComponent(percentEncoded);
  } catch (e) {
    console.error('Base64 decoding error:', e);
    return '';
  }
}

/**
 * Creates a shareable URL containing the personalized greeting data.
 * Uses both structured query parameters and a compact fallback for maximum compatibility.
 */
export function generateWishUrl(wish: WishData): string {
  const baseUrl = getBaseUrl();
  const params = new URLSearchParams();

  params.set('to', wish.recipient.trim());
  params.set('from', wish.sender.trim());
  params.set('msg', wish.message.trim());
  params.set('cat', wish.category);
  params.set('thm', wish.theme);
  if (wish.timestamp) {
    params.set('t', wish.timestamp.toString());
  }

  return `${baseUrl}/wish?${params.toString()}`;
}

/**
 * Parses and validates shared greeting data from current URL search params.
 */
export function parseWishFromUrl(search: string): { wish: WishData | null; error?: string } {
  try {
    const params = new URLSearchParams(search);

    // Check if passed as compact payload ?d=...
    const compactData = params.get('d');
    if (compactData) {
      const decodedJson = decodeBase64ToUnicode(compactData);
      if (decodedJson) {
        const parsed = JSON.parse(decodedJson);
        if (parsed.recipient && parsed.sender && parsed.message) {
          return {
            wish: {
              recipient: sanitizeText(parsed.recipient),
              sender: sanitizeText(parsed.sender),
              message: sanitizeText(parsed.message),
              category: VALID_CATEGORIES.includes(parsed.category) ? parsed.category : 'Universal',
              theme: VALID_THEMES.includes(parsed.theme) ? parsed.theme : 'golden-galaxy',
              timestamp: parsed.timestamp ? Number(parsed.timestamp) : undefined,
            },
          };
        }
      }
    }

    // Direct query parameters
    const recipient = sanitizeText(params.get('to') || '');
    const sender = sanitizeText(params.get('from') || '');
    const message = sanitizeText(params.get('msg') || '');
    const rawCategory = params.get('cat') as WishCategory;
    const rawTheme = params.get('thm') as WishTheme;
    const rawTimestamp = params.get('t');

    if (!recipient && !sender && !message) {
      return { wish: null };
    }

    if (!recipient) {
      return { wish: null, error: 'Recipient name is missing from the wish link.' };
    }
    if (!sender) {
      return { wish: null, error: 'Sender name is missing from the wish link.' };
    }
    if (!message) {
      return { wish: null, error: 'Greeting message is missing from the wish link.' };
    }

    const category: WishCategory = VALID_CATEGORIES.includes(rawCategory) ? rawCategory : 'Universal';
    const theme: WishTheme = VALID_THEMES.includes(rawTheme) ? rawTheme : 'golden-galaxy';
    const timestamp = rawTimestamp ? parseInt(rawTimestamp, 10) : undefined;

    return {
      wish: {
        recipient,
        sender,
        message,
        category,
        theme,
        timestamp: Number.isNaN(timestamp) ? undefined : timestamp,
      },
    };
  } catch (err) {
    console.error('Error parsing wish from URL:', err);
    return { wish: null, error: 'Could not read greeting data. The link may be malformed or truncated.' };
  }
}

/**
 * Copies text to the clipboard with genuine verification and fallback.
 */
export async function copyToClipboard(text: string): Promise<boolean> {
  if (!text) return false;

  // Modern navigator.clipboard API
  if (navigator?.clipboard?.writeText) {
    try {
      await navigator.clipboard.writeText(text);
      return true;
    } catch (err) {
      console.warn('navigator.clipboard.writeText failed, trying fallback textarea:', err);
    }
  }

  // Graceful fallback for non-secure contexts or older browsers
  try {
    const textArea = document.createElement('textarea');
    textArea.value = text;
    textArea.style.position = 'fixed';
    textArea.style.top = '-9999px';
    textArea.style.left = '-9999px';
    textArea.setAttribute('readonly', '');
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();

    const successful = document.execCommand('copy');
    document.body.removeChild(textArea);
    return successful;
  } catch (err) {
    console.error('Copy fallback failed:', err);
    return false;
  }
}

/**
 * Opens WhatsApp with a beautifully formatted festive Diwali greeting.
 */
export function shareToWhatsApp(wish: WishData, url: string): void {
  const previewMessage = wish.message.length > 100 ? `${wish.message.slice(0, 97)}...` : wish.message;
  const text =
    `🪔✨ *Diwali Galaxy Wish for ${wish.recipient}* ✨🪔\n\n` +
    `_From: ${wish.sender}_\n\n` +
    `"${previewMessage}"\n\n` +
    `🌌 Open your magical glowing Diwali envelope in the cosmic galaxy here:\n${url}\n\n` +
    `Wishing you a joyful and luminous Diwali! 🪔`;

  const waUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(text)}`;
  window.open(waUrl, '_blank', 'noopener,noreferrer');
}

/**
 * Native Web Share API if supported.
 */
export async function shareViaWebShare(wish: WishData, url: string): Promise<boolean> {
  if (typeof navigator !== 'undefined' && navigator.share) {
    try {
      await navigator.share({
        title: `Diwali Galaxy Wish for ${wish.recipient}`,
        text: `🪔 A magical cosmic Diwali greeting from ${wish.sender} is waiting for you!`,
        url,
      });
      return true;
    } catch (err) {
      // User cancelled share or aborted
      if ((err as Error)?.name === 'AbortError') {
        return false;
      }
      console.warn('Web Share failed:', err);
      return false;
    }
  }
  return false;
}
