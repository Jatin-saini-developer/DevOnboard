import { useEffect, useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { connectGithub } from '../../services/integrationService'

function GithubCallback() {
  const navigate = useNavigate()
  const [status, setStatus] = useState('connecting') // connecting | success | error
  const [errorMessage, setErrorMessage] = useState('')
  const hasRun = useRef(false)

  useEffect(() => {
    // React StrictMode mein useEffect do baar chal sakta hai —
    // yeh guard ensure karta hai ki exchange sirf EK BAAR ho
    // (warna same "code" GitHub ko do baar bhejne se error aayega)
    if (hasRun.current) return
    hasRun.current = true

    handleCallback()
  }, [])

  const handleCallback = async () => {
    // URL se "code" parameter nikaalo
    const params = new URLSearchParams(window.location.search)
    const code = params.get('code')
    const githubError = params.get('error')

    if (githubError) {
      setStatus('error')
      setErrorMessage('You denied access or cancelled the connection.')
      return
    }

    if (!code) {
      setStatus('error')
      setErrorMessage('No authorization code received from GitHub.')
      return
    }

    try {
      await connectGithub(code)
      setStatus('success')

      // 1.5 second baad Integrations page pe wapas bhej do
      setTimeout(() => {
        navigate('/integrations', { replace: true })
      }, 1500)

    } catch (err) {
      setStatus('error')
      setErrorMessage(err.message || 'Failed to connect GitHub.')
    }
  }

  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-4">
      <div className="text-center">

        {status === 'connecting' && (
          <>
            <p className="text-white text-base font-medium mb-2">
              Connecting your GitHub account...
            </p>
            <p className="text-neutral-600 text-[13px]">
              Please wait
            </p>
          </>
        )}

        {status === 'success' && (
          <>
            <div className="text-3xl mb-3">✅</div>
            <p className="text-white text-base font-medium mb-2">
              GitHub connected successfully!
            </p>
            <p className="text-neutral-600 text-[13px]">
              Redirecting you back...
            </p>
          </>
        )}

        {status === 'error' && (
          <>
            <div className="text-3xl mb-3">❌</div>
            <p className="text-white text-base font-medium mb-2">
              Connection failed
            </p>
            <p className="text-neutral-600 text-[13px] mb-6">
              {errorMessage}
            </p>
            <button
              onClick={() => navigate('/integrations')}
              className="bg-white hover:bg-neutral-200 text-black text-[13px] font-semibold rounded-lg px-4 py-2"
            >
              Back to Integrations
            </button>
          </>
        )}

      </div>
    </div>
  )
}

export default GithubCallback