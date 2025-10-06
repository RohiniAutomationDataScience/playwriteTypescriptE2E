// Centralized API configuration
export const API_BASE = process.env.API_BASE_URL || 'http://127.0.0.1:4000';

export const API_TIMEOUT = 15000; // ms

export const HEADERS = {
  'Content-Type': 'application/json',
  Accept: 'application/json',
};