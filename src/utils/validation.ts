import { WishCategory, WishData, WishTheme } from '../types/wish';

export interface ValidationResult {
  isValid: boolean;
  errors: {
    sender?: string;
    recipient?: string;
    message?: string;
    category?: string;
    theme?: string;
  };
}

export const VALID_CATEGORIES: WishCategory[] = [
  'Family',
  'Friends',
  'Love',
  'Happiness',
  'Prosperity',
  'Success',
  'Universal',
];

export const VALID_THEMES: WishTheme[] = [
  'golden-galaxy',
  'royal-blue',
  'traditional-diwali',
];

export const LIMITS = {
  NAME_MAX: 50,
  MESSAGE_MAX: 500,
  NAME_MIN: 1,
  MESSAGE_MIN: 2,
};

export function sanitizeText(input: string): string {
  if (!input) return '';
  // Remove null bytes, HTML tags, and potentially dangerous injection while preserving Unicode (Bengali, Hindi, etc.)
  return input
    .replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g, '')
    .replace(/<[^>]*>/g, '')
    .trim();
}

export function validateWish(wish: Partial<WishData>): ValidationResult {
  const errors: ValidationResult['errors'] = {};

  const recipient = sanitizeText(wish.recipient || '');
  if (!recipient) {
    errors.recipient = 'Please enter the recipient’s name.';
  } else if (recipient.length < LIMITS.NAME_MIN) {
    errors.recipient = 'Name is too short.';
  } else if (recipient.length > LIMITS.NAME_MAX) {
    errors.recipient = `Name cannot exceed ${LIMITS.NAME_MAX} characters.`;
  }

  const sender = sanitizeText(wish.sender || '');
  if (!sender) {
    errors.sender = 'Please enter your name or family moniker.';
  } else if (sender.length < LIMITS.NAME_MIN) {
    errors.sender = 'Sender name is too short.';
  } else if (sender.length > LIMITS.NAME_MAX) {
    errors.sender = `Sender name cannot exceed ${LIMITS.NAME_MAX} characters.`;
  }

  const message = sanitizeText(wish.message || '');
  if (!message) {
    errors.message = 'Please choose a wish message or write your own heartfelt greeting.';
  } else if (message.length < LIMITS.MESSAGE_MIN) {
    errors.message = 'Message must be at least 2 characters.';
  } else if (message.length > LIMITS.MESSAGE_MAX) {
    errors.message = `Message cannot exceed ${LIMITS.MESSAGE_MAX} characters.`;
  }

  if (wish.category && !VALID_CATEGORIES.includes(wish.category)) {
    errors.category = 'Please select a valid festive category.';
  }

  if (wish.theme && !VALID_THEMES.includes(wish.theme)) {
    errors.theme = 'Please select a valid festive theme.';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
}
