/**
 * authService.js — Auth API calls
 *
 * All authentication-related HTTP requests live here.
 * Pages and Redux thunks import these functions rather than
 * calling api.js directly — keeps concerns separated.
 */

import api from './api'

/**
 * Login with email + password.
 * Returns { token, user } on success.
 * Throws a structured error on failure.
 */
export async function loginUser({ email, password }) {
  const response = await api.post('/auth/login', { email, password })
  return response.data  // ✅ — { token, user } seedha return hoga
}

/**
 * Register a new account.
 * Returns { token, user } on success.
 * Throws a structured error on failure.
 */
export async function signupUser({ name, email, password }) {
  const response = await api.post('/auth/register', { name, email, password })
  return response.data  // ✅
}

/**
 * Fetch the currently authenticated user's profile.
 * Requires a valid JWT already stored in localStorage.
 * Returns { user } on success.
 */
export async function getMe() {
  const response = await api.get('/auth/me')
  return response.data  // ✅ — { user }
}

/**
 * Logout the current user.
 * Notifies the backend so it can log/audit the event.
 */
export async function logoutUser() {
  const response = await api.post('/auth/logout')
  return response.data  // ✅
}

export async function googleAuth(idToken) {
  const response = await api.post('/auth/google', { idToken })
  return response.data
}