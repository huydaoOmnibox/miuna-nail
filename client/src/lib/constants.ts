export const NO_IMAGE = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='800' height='600' viewBox='0 0 800 600'%3E%3Crect width='800' height='600' fill='%23f3f4f6'/%3E%3Ctext x='400' y='280' text-anchor='middle' font-family='Arial, sans-serif' font-size='48' fill='%23d1d5db'%3E📷%3C/text%3E%3Ctext x='400' y='340' text-anchor='middle' font-family='Arial, sans-serif' font-size='24' fill='%239ca3af'%3ENo Image%3C/text%3E%3C/svg%3E";

// Environment configuration
// Use Vite's import.meta.env in the browser. Vite exposes MODE, DEV, PROD
// and user vars prefixed with VITE_. This avoids referencing `process` in client code.
const MODE = (import.meta as any).env?.MODE ?? (import.meta as any).env?.VITE_MODE ?? 'development';
const VERCEL_URL = (import.meta as any).env?.VERCEL_URL ?? (import.meta as any).env?.VITE_VERCEL_URL;
const API_BASE_URL = (import.meta as any).env?.VITE_API_BASE_URL ?? (import.meta as any).env?.API_BASE_URL;

export const ENV = {
  NODE_ENV: MODE,
  IS_PRODUCTION: !!((import.meta as any).env?.PROD),
  IS_DEVELOPMENT: !!((import.meta as any).env?.DEV),
  VERCEL_URL: VERCEL_URL,
  API_BASE_URL: VERCEL_URL ? `https://${VERCEL_URL}/api` : API_BASE_URL || 'http://localhost:3000/api',
} as const;

// MiuNa brand colors
export const BRAND_COLORS = {
  primary: '#A5C185', // New primary green color
  secondary: '#1A1A1A', // Black for text and accents
  accent: '#FFFFFF', // White for contrast
  lightGreen: '#E1EFDB', // Light green background
  darkGreen: '#55844B', // Darker green for hover states
  gray: '#4A4A4A', // Medium gray
  lightGray: '#F5F5F5', // Light gray backgrounds
  text: '#2C2C2C', // Main text color
  title: '#1A1A1A', // Title text color
} as const;

// Theme constants
export const THEME = {
  borderRadius: '1rem',
  transition: 'all 0.2s ease-in-out',
  shadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
  shadowLg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
} as const; 