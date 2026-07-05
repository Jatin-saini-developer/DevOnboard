/**
 * api.js — Centralized HTTP client
 *
 * Every request goes through this module so that:
 *   • The JWT is automatically injected from localStorage
 *   • Non-2xx responses are normalised into a consistent Error shape
 *   • A single place to add refresh-token logic later
 *
 * The Vite dev-proxy (vite.config.js) forwards /api → http://localhost:5000
 * so we don't need the full origin in the base URL.
 */

const BASE_URL = import.meta.env.VITE_API_URL || '/api/v1'
/**
 * Build headers, injecting the Authorization header when a token exists.
 */
function buildHeaders(extraHeaders = {}) {
  const headers = {
    'Content-Type': 'application/json',
    ...extraHeaders,
  }

  const token = localStorage.getItem('token')
  if (token) {
    headers['Authorization'] = `Bearer ${token}`
  }

  return headers
}

/**
 * Core fetch wrapper.
 * Throws a structured error object `{ message, status, data }` on failure.
 */
async function request(endpoint, { method = 'GET', body, headers = {} } = {}) {
  const config = {
    method,
    headers: buildHeaders(headers),
  }

  if (body) {
    config.body = JSON.stringify(body)
  }

  const response = await fetch(`${BASE_URL}${endpoint}`, config)

  // Try to parse JSON regardless of success/failure
  let data
  try {
    data = await response.json()
  } catch {
    data = { message: response.statusText }
  }

  if (!response.ok) {
    const error = new Error(data?.message || 'Something went wrong')
    error.status = response.status
    error.data = data
    throw error
  }

  return data
}

// ─── Convenience methods ────────────────────────────────────────────────────

export const api = {
  get:    (endpoint, opts = {}) => request(endpoint, { ...opts, method: 'GET' }),
  post:   (endpoint, body, opts = {}) => request(endpoint, { ...opts, method: 'POST', body }),
  put:    (endpoint, body, opts = {}) => request(endpoint, { ...opts, method: 'PUT', body }),
  patch:  (endpoint, body, opts = {}) => request(endpoint, { ...opts, method: 'PATCH', body }),
  delete: (endpoint, opts = {}) => request(endpoint, { ...opts, method: 'DELETE' }),
}

export default api
