import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { getIntegrationsStatus, disconnectIntegration } from '../../services/integrationService'

function Integrations() {
  const [status, setStatus] = useState({
    github: false,
    slack: false,
    jira: false,
    notion: false,
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadStatus()
  }, [])

  const loadStatus = async () => {
    try {
      const data = await getIntegrationsStatus()
      setStatus(data)
    } catch (err) {
      console.error('Failed to load integration status:', err.message)
    } finally {
      setLoading(false)
    }
  }

  const handleConnectGithub = () => {
    const clientId = import.meta.env.VITE_GITHUB_CLIENT_ID
    const redirectUri = `${window.location.origin}/integrations/github/callback`

    // User ko GitHub ke authorize page pe bhej do
    const githubAuthUrl = `https://github.com/login/oauth/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&scope=user:email,admin:org`

    window.location.href = githubAuthUrl
  }

  const handleDisconnect = async (provider) => {
    try {
      await disconnectIntegration(provider)
      setStatus({ ...status, [provider]: false })
    } catch (err) {
      console.error('Failed to disconnect:', err.message)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <p className="text-neutral-500 text-sm">Loading...</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-black">
      <div className="border-b border-white/[0.06] px-6 py-3.5 flex items-center justify-between">
        <Link to="/dashboard" className="text-neutral-500 hover:text-white text-[13px]">
          ← Back to Dashboard
        </Link>
      </div>

      <div className="max-w-2xl mx-auto px-6 py-10">
        <h2 className="text-white text-xl font-semibold tracking-tight mb-2">
          Integrations
        </h2>
        <p className="text-neutral-600 text-[13px] mb-8">
          Connect your tools so ZeroDay can automate your onboarding workflows
        </p>

        <div className="border border-white/[0.06] bg-white/[0.02] rounded-xl p-5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-2xl">🐙</span>
            <div>
              <p className="text-white text-[14px] font-medium">GitHub</p>
              <p className="text-neutral-600 text-[12px]">
                {status.github ? 'Connected' : 'Not connected'}
              </p>
            </div>
          </div>

          {status.github ? (
            <button
              onClick={() => handleDisconnect('github')}
              className="text-red-400/80 hover:text-red-400 text-[13px] border border-red-500/[0.15] rounded-lg px-4 py-1.5"
            >
              Disconnect
            </button>
          ) : (
            <button
              onClick={handleConnectGithub}
              className="bg-white hover:bg-neutral-200 text-black text-[13px] font-semibold rounded-lg px-4 py-1.5"
            >
              Connect
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

export default Integrations