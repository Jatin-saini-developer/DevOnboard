import { useState, useEffect, useCallback } from 'react'
import { getSlackChannels } from '../../services/integrationService'

/**
 * ChannelSelect
 *
 * Self-contained component that:
 *   1. Fetches Slack channels from the backend on mount.
 *   2. Renders loading / disconnected (401) / error / success states.
 *   3. Calls onChange(selectedChannelIds) when selection changes.
 *
 * Intentionally isolated from ConfigPanel so that all Slack API concerns
 * live here, not in the generic form renderer.
 *
 * @param {string[]} value     - Currently selected channel IDs (from node.data)
 * @param {Function} onChange  - Called with the full updated ID array
 */
function ChannelSelect({ value = [], onChange }) {
  const [channels, setChannels] = useState([])
  const [status, setStatus] = useState('loading') // 'loading' | 'disconnected' | 'error' | 'ready'

  /**
   * loadChannels — extracted fetch logic.
   * Called on mount (via useEffect) and directly by the Retry button onClick.
   * Setting state here is always safe: it happens inside an async callback,
   * never during the render phase.
   */
  const loadChannels = useCallback(() => {
    setStatus('loading')

    getSlackChannels()
      .then((data) => {
        setChannels(data)
        setStatus('ready')
      })
      .catch((err) => {
        // api.js attaches .status to thrown errors from non-2xx responses
        setStatus(err.status === 401 ? 'disconnected' : 'error')
      })
  }, [])

  // Fetch on mount only. Retry is handled by calling loadChannels() directly.
  useEffect(() => {
    loadChannels()
  }, [loadChannels])

  const handleToggle = (channelId) => {
    const next = value.includes(channelId)
      ? value.filter((id) => id !== channelId)
      : [...value, channelId]
    onChange(next)
  }

  // ── Loading ────────────────────────────────────────────────────────────────
  if (status === 'loading') {
    return (
      <div style={styles.stateBox}>
        <div style={styles.spinner} />
        <span style={styles.stateText}>Loading Slack channels…</span>
      </div>
    )
  }

  // ── Disconnected (401) ─────────────────────────────────────────────────────
  if (status === 'disconnected') {
    return (
      <div style={styles.stateBox}>
        <span style={{ fontSize: '18px' }}>🔌</span>
        <span style={styles.stateText}>Slack isn't connected.</span>
        <span style={{ ...styles.stateText, color: 'rgba(255,255,255,0.2)', fontSize: '10px' }}>
          Connect Slack in the Integrations settings.
        </span>
      </div>
    )
  }

  // ── Error ──────────────────────────────────────────────────────────────────
  if (status === 'error') {
    return (
      <div style={styles.stateBox}>
        <span style={{ fontSize: '18px' }}>⚠️</span>
        <span style={styles.stateText}>Unable to load Slack channels.</span>
        <button
          onClick={loadChannels}
          style={styles.retryBtn}
          onMouseEnter={(e) => { e.target.style.borderColor = 'rgba(255,255,255,0.2)'; e.target.style.color = '#fff' }}
          onMouseLeave={(e) => { e.target.style.borderColor = 'rgba(255,255,255,0.1)'; e.target.style.color = 'rgba(255,255,255,0.5)' }}
        >
          Retry
        </button>
      </div>
    )
  }

  // ── Success ────────────────────────────────────────────────────────────────
  if (channels.length === 0) {
    return (
      <div style={styles.stateBox}>
        <span style={styles.stateText}>No channels found.</span>
      </div>
    )
  }

  return (
    <div style={styles.list}>
      {channels.map((ch) => {
        const checked = value.includes(ch.id)
        return (
          <label
            key={ch.id}
            style={{
              ...styles.row,
              background: checked ? 'rgba(74,222,128,0.05)' : 'rgba(255,255,255,0.02)',
              borderColor: checked ? 'rgba(74,222,128,0.15)' : 'rgba(255,255,255,0.06)',
            }}
          >
            <input
              type="checkbox"
              checked={checked}
              onChange={() => handleToggle(ch.id)}
              style={styles.checkbox}
            />
            <span style={styles.channelName}>
              {ch.isPrivate ? '🔒' : '#'} {ch.name}
            </span>
          </label>
        )
      })}
    </div>
  )
}

// ─── Inline Styles ────────────────────────────────────────────────────────────

const styles = {
  stateBox: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '8px',
    padding: '16px 12px',
    background: 'rgba(255,255,255,0.02)',
    border: '1px solid rgba(255,255,255,0.06)',
    borderRadius: '8px',
    textAlign: 'center',
  },
  stateText: {
    color: 'rgba(255,255,255,0.35)',
    fontSize: '12px',
    margin: 0,
  },
  spinner: {
    width: '16px',
    height: '16px',
    border: '2px solid rgba(255,255,255,0.1)',
    borderTopColor: 'rgba(255,255,255,0.4)',
    borderRadius: '50%',
    animation: 'spin 0.7s linear infinite',
  },
  retryBtn: {
    marginTop: '4px',
    background: 'none',
    border: '1px solid rgba(255,255,255,0.1)',
    borderRadius: '6px',
    color: 'rgba(255,255,255,0.5)',
    fontSize: '11px',
    padding: '5px 14px',
    cursor: 'pointer',
    transition: 'all 0.15s ease',
  },
  list: {
    display: 'flex',
    flexDirection: 'column',
    gap: '4px',
  },
  row: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    padding: '8px 10px',
    border: '1px solid',
    borderRadius: '7px',
    cursor: 'pointer',
    transition: 'all 0.15s ease',
    userSelect: 'none',
  },
  checkbox: {
    accentColor: '#4ade80',
    width: '14px',
    height: '14px',
    flexShrink: 0,
    cursor: 'pointer',
  },
  channelName: {
    color: 'rgba(255,255,255,0.7)',
    fontSize: '12px',
    fontWeight: '500',
  },
}

// Inject keyframe animation for spinner (once, at module load)
if (typeof document !== 'undefined' && !document.getElementById('channel-select-spin')) {
  const style = document.createElement('style')
  style.id = 'channel-select-spin'
  style.textContent = '@keyframes spin { to { transform: rotate(360deg); } }'
  document.head.appendChild(style)
}

export default ChannelSelect
