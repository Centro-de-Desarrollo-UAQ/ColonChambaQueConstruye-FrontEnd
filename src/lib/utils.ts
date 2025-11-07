import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Normalizes a string by removing diacritical marks (accents) and converting it to lowercase.
 * This is useful for case-insensitive comparisons or searches.
 *
 * @param text - The input string to normalize.
 * @returns The normalized string without diacritical marks and in lowercase.
 */
export function normalizeText(text: string): string {
  return text
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase();
}

/**
 * Converts a date string to a localized date string in the 'es-MX' format.
 *
 * The returned string includes the year (numeric), month (short), and day (numeric).
 *
 * @param date - The date to format, as a string.
 * @returns The formatted date string in 'es-MX' locale.
 */
export function dateToLocaleDateString(date?: string | Date | null): string {
  if (!date) return '';
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  if (!(dateObj instanceof Date) || isNaN(dateObj.getTime())) return '';
  return dateObj.toLocaleDateString('es-MX', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
}

export function toYMD(date: Date): string {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(
    date.getDate(),
  ).padStart(2, '0')}`;
}
