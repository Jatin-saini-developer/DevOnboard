import { Routes, Route, Navigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { selectIsLoggedIn } from './store/authSlice'

import Login from './pages/Login'
import Signup from './pages/Signup'
import Dashboard from './pages/Dashboard'
import WorkflowEditor from './pages/WorkflowEditor'
import LandingPage from './pages/LandingPage'
import Privacy from './pages/Privacy'
import Terms from './pages/Terms'
import Security from './pages/Security'
import Integrations from './pages/Integrations/Integrations'
import GithubCallback from './pages/Integrations/GithubCallback'

/**
 * ProtectedRoute — wraps any route that requires authentication.
 * Unauthenticated users are redirected to /login with the intended
 * destination saved in `state.from` so we can redirect back after login.
 */
function ProtectedRoute({ children }) {
  const isLoggedIn = useSelector(selectIsLoggedIn)
  return isLoggedIn ? children : <Navigate to="/login" replace />
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/landingpage" replace />} />
      <Route path="/landingpage" element={<LandingPage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/privacy" element={<Privacy />} />
      <Route path="/terms" element={<Terms />} />
      <Route path="/security" element={<Security />} />

      {/* Protected routes */}
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/workflow/:id"
        element={
          <ProtectedRoute>
            <WorkflowEditor />
          </ProtectedRoute>
        }
      />
      <Route
        path='/integrations'
        element={
          <ProtectedRoute>
            <Integrations />
          </ProtectedRoute>
        }
      />
      <Route
        path='/integrations/github/callback'
        element={
          <ProtectedRoute>
            <GithubCallback />
          </ProtectedRoute>
        }
      />
    </Routes>
  )
}

export default App