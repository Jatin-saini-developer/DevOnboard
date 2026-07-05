
/**
 * authSlice.js — Redux state for authentication
 *
 * State shape:
 *   user    : object | null   — public user profile from backend
 *   token   : string | null   — JWT stored in localStorage AND here for selectors
 *   loading : boolean         — true while any auth request is in-flight
 *   error   : string | null   — last error message (cleared on new attempt)
 *
 * The token is persisted in localStorage so it survives page refreshes.
 * On app boot, we re-hydrate state from localStorage in the initialState.
 */

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
// import { loginUser, signupUser, getMe } from '../services/authService'
import { loginUser, signupUser, getMe, logoutUser as logoutAPI, googleAuth as googleAuthAPI } from '../services/authService'

// ─── Initial state (hydrated from localStorage) ─────────────────────────────

const storedToken = localStorage.getItem('token') || null
const storedUser = (() => {
  try {
    const raw = localStorage.getItem('user')
    return raw ? JSON.parse(raw) : null
  } catch {
    return null
  }
})()

const initialState = {
  user: storedUser,
  token: storedToken,
  loading: false,
  error: null,
}

// ─── Async thunks ────────────────────────────────────────────────────────────

export const login = createAsyncThunk(
  'auth/login',
  async (credentials, { rejectWithValue }) => {
    try {
      const data = await loginUser(credentials)   // { success, token, user }
      return data
    } catch (err) {
      return rejectWithValue(err.message || 'Login failed')
    }
  }
)

export const signup = createAsyncThunk(
  'auth/signup',
  async (credentials, { rejectWithValue }) => {
    try {
      const data = await signupUser(credentials)  // { success, token, user }
      return data
    } catch (err) {
      return rejectWithValue(err.message || 'Signup failed')
    }
  }
)

export const fetchCurrentUser = createAsyncThunk(
  'auth/fetchCurrentUser',
  async (_, { rejectWithValue }) => {
    try {
      const data = await getMe()                  // { success, user }
      return data
    } catch (err) {
      return rejectWithValue(err.message)
    }
  }
)

export const googleLogin = createAsyncThunk(
  'auth/googleLogin',
  async (idToken, { rejectWithValue }) => {
    try {
      const data = await googleAuthAPI(idToken)
      return data
    } catch (err) {
      return rejectWithValue(err.message || 'Google login failed')
    }
  }
)

// ─── Helper — persist auth to localStorage ───────────────────────────────────

function persistAuth(token, user) {
  localStorage.setItem('token', token)
  localStorage.setItem('user', JSON.stringify(user))
}

function clearAuth() {
  localStorage.removeItem('token')
  localStorage.removeItem('user')
}

// ─── Slice ────────────────────────────────────────────────────────────────────

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    /**
     * Call this to log out the user and wipe all persisted auth data.
     */
    logout(state) {
      state.user = null
      state.token = null
      state.error = null
      clearAuth()
    },
    /**
     * Clear any stale error (e.g. when user starts typing again).
     */
    clearError(state) {
      state.error = null
    },
  },
  extraReducers: (builder) => {
    // ── login ─────────────────────────────────────────────────────────
    builder
      .addCase(login.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(login.fulfilled, (state, action) => {
        const { token, user } = action.payload
        state.loading = false
        state.token = token
        state.user = user
        persistAuth(token, user)
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })

    // ── signup ────────────────────────────────────────────────────────
    builder
      .addCase(signup.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(signup.fulfilled, (state, action) => {
        const { token, user } = action.payload
        state.loading = false
        state.token = token
        state.user = user
        persistAuth(token, user)
      })
      .addCase(signup.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })


    builder
      .addCase(googleLogin.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(googleLogin.fulfilled, (state, action) => {
        const { token, user } = action.payload
        state.loading = false
        state.token = token
        state.user = user
        persistAuth(token, user)
      })
      .addCase(googleLogin.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })

    // ── fetchCurrentUser ──────────────────────────────────────────────
    builder
      .addCase(fetchCurrentUser.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchCurrentUser.fulfilled, (state, action) => {
        state.loading = false
        state.user = action.payload.user
      })
      .addCase(fetchCurrentUser.rejected, (state) => {
        // Token is invalid / expired — force logout
        state.loading = false
        state.user = null
        state.token = null
        clearAuth()
      })
  },
})

export const { logout, clearError } = authSlice.actions

// ─── Selectors ────────────────────────────────────────────────────────────────

export const selectUser = (state) => state.auth.user
export const selectToken = (state) => state.auth.token
export const selectAuthLoading = (state) => state.auth.loading
export const selectAuthError = (state) => state.auth.error
export const selectIsLoggedIn = (state) => Boolean(state.auth.token)

export default authSlice.reducer
