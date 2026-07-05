import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
// import { signup, clearError, selectAuthLoading, selectAuthError, selectIsLoggedIn } from '../store/authSlice'
import { GoogleLogin } from '@react-oauth/google'
import { signup, googleLogin, clearError, selectAuthLoading, selectAuthError, selectIsLoggedIn } from '../store/authSlice'
function Signup() {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const loading = useSelector(selectAuthLoading)
  const authError = useSelector(selectAuthError)
  const isLoggedIn = useSelector(selectIsLoggedIn)

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  })
  const [localError, setLocalError] = useState('')

  // Redirect if already authenticated
  useEffect(() => {
    if (isLoggedIn) navigate('/dashboard', { replace: true })
  }, [isLoggedIn, navigate])

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
    setLocalError('')
    dispatch(clearError())
  }

  const handleGoogleSuccess = async (credentialResponse) => {
    const idToken = credentialResponse.credential
    const result = await dispatch(googleLogin(idToken))

    if (googleLogin.fulfilled.match(result)) {
      navigate('/dashboard', { replace: true })
    }
  }

  const handleGoogleError = () => {
    setLocalError('Google sign-in failed. Please try again.')
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    // Client-side validation
    if (!formData.name || !formData.email || !formData.password || !formData.confirmPassword) {
      setLocalError('Please fill in all fields')
      return
    }
    if (formData.password.length < 8) {
      setLocalError('Password must be at least 8 characters')
      return
    }
    if (formData.password !== formData.confirmPassword) {
      setLocalError('Passwords do not match')
      return
    }

    // Dispatch the signup thunk (confirmPassword is not sent to the API)
    const { name, email, password } = formData
    const result = await dispatch(signup({ name, email, password }))

    if (signup.fulfilled.match(result)) {
      navigate('/dashboard', { replace: true })
    }
  }

  const displayError = authError || localError

  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-4">
      <div className="w-full max-w-sm">

        {/* Logo */}
        <div className="text-center mb-10">
          <Link to="/" className="inline-flex items-center gap-2.5">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/[0.08] border border-white/[0.06]">
              <svg className="w-4 h-4 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
              </svg>
            </div>
            <span className="text-[17px] font-semibold tracking-tight text-white">
              DevOnboard
            </span>
          </Link>
          <p className="text-neutral-600 text-[13px] mt-3">
            Automate your developer onboarding
          </p>
        </div>

        {/* Card */}
        <div className="border border-white/[0.06] bg-white/[0.02] rounded-xl p-7">

          <h2 className="text-white text-lg font-semibold mb-6">
            Create your account
          </h2>

          {/* Google Sign-Up — custom styled overlay */}
          <div className="mb-5 relative">
            {/* Custom styled button (visual only) */}
            <button
              type="button"
              className="w-full flex items-center justify-center gap-3 bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.08] hover:border-white/[0.14] text-neutral-300 text-[14px] font-medium rounded-lg px-4 py-2.5 transition-all duration-200 cursor-pointer"
            >
              <svg className="w-[18px] h-[18px]" viewBox="0 0 24 24">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4"/>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
              </svg>
              Sign up with Google
            </button>
            {/* Real GoogleLogin iframe — invisible, overlaid on top to capture clicks */}
            <div className="absolute inset-0 opacity-0 overflow-hidden [&_iframe]:!w-full [&_iframe]:!h-full" style={{ zIndex: 1 }}>
              <GoogleLogin
                onSuccess={handleGoogleSuccess}
                onError={handleGoogleError}
                theme="filled_black"
                size="large"
                width="400"
                text="signup_with"
              />
            </div>
          </div>

          {/* Divider */}
          <div className="flex items-center gap-3 mb-5">
            <div className="flex-1 h-px bg-white/[0.06]"></div>
            <span className="text-neutral-600 text-[12px]">or</span>
            <div className="flex-1 h-px bg-white/[0.06]"></div>
          </div>

          {/* Error message */}
          {displayError && (
            <div className="bg-red-500/[0.06] border border-red-500/[0.1] text-red-400/80 text-[13px] rounded-lg px-4 py-3 mb-5">
              {displayError}
            </div>
          )}

          {/* Form */}
          <div className="space-y-4">

            <div>
              <label className="text-neutral-500 text-[11px] font-medium uppercase tracking-wider">
                Full Name
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="John Doe"
                disabled={loading}
                className="w-full mt-1.5 bg-white/[0.02] border border-white/[0.06] text-white text-[14px] rounded-lg px-4 py-2.5 outline-none focus:border-white/[0.15] transition-colors placeholder-neutral-700 disabled:opacity-50"
              />
            </div>

            <div>
              <label className="text-neutral-500 text-[11px] font-medium uppercase tracking-wider">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="you@company.com"
                disabled={loading}
                className="w-full mt-1.5 bg-white/[0.02] border border-white/[0.06] text-white text-[14px] rounded-lg px-4 py-2.5 outline-none focus:border-white/[0.15] transition-colors placeholder-neutral-700 disabled:opacity-50"
              />
            </div>

            <div>
              <label className="text-neutral-500 text-[11px] font-medium uppercase tracking-wider">
                Password
              </label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Min. 8 characters"
                disabled={loading}
                className="w-full mt-1.5 bg-white/[0.02] border border-white/[0.06] text-white text-[14px] rounded-lg px-4 py-2.5 outline-none focus:border-white/[0.15] transition-colors placeholder-neutral-700 disabled:opacity-50"
              />
            </div>

            <div>
              <label className="text-neutral-500 text-[11px] font-medium uppercase tracking-wider">
                Confirm Password
              </label>
              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="••••••••"
                disabled={loading}
                className="w-full mt-1.5 bg-white/[0.02] border border-white/[0.06] text-white text-[14px] rounded-lg px-4 py-2.5 outline-none focus:border-white/[0.15] transition-colors placeholder-neutral-700 disabled:opacity-50"
              />
            </div>

            <button
              onClick={handleSubmit}
              disabled={loading}
              className="w-full bg-white hover:bg-neutral-200 disabled:opacity-40 disabled:cursor-not-allowed text-black text-[14px] font-semibold rounded-lg px-4 py-2.5 transition-all duration-200 mt-2"
            >
              {loading ? 'Creating account...' : 'Create account'}
            </button>

          </div>

          {/* Divider */}
          <div className="border-t border-white/[0.04] mt-6 pt-6">
            <p className="text-neutral-600 text-[13px] text-center">
              Already have an account?{' '}
              <Link
                to="/login"
                className="text-neutral-300 hover:text-white font-medium transition-colors duration-200"
              >
                Sign in
              </Link>
            </p>
          </div>

        </div>

        {/* Terms */}
        <p className="text-neutral-800 text-[11px] text-center mt-5">
          By creating an account you agree to our{' '}
          <span className="text-neutral-600 cursor-pointer hover:text-neutral-400 transition-colors duration-200">
            Terms of Service
          </span>{' '}
          and{' '}
          <span className="text-neutral-600 cursor-pointer hover:text-neutral-400 transition-colors duration-200">
            Privacy Policy
          </span>
        </p>

      </div>
    </div>
  )
}

export default Signup