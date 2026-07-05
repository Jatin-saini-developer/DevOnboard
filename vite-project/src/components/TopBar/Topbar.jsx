import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import {
  setWorkflowName,
  saveWorkflow,
  selectWorkflowName,
  selectWorkflowSaving,
  selectLastSavedAt,
} from '../../store/WorkFlowSlice'

function Topbar() {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const workflowName = useSelector(selectWorkflowName)
  const saving = useSelector(selectWorkflowSaving)
  const lastSavedAt = useSelector(selectLastSavedAt)

  const [isEditing, setIsEditing] = useState(false)

  const handleSave = async () => {
    await dispatch(saveWorkflow())
  }

  const handleNameClick = () => {
    setIsEditing(true)
  }

  const handleNameBlur = (e) => {
    const value = e.target.value.trim()
    if (value) {
      dispatch(setWorkflowName(value))
    }
    setIsEditing(false)
  }

  const handleNameKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.target.blur()
    }
    if (e.key === 'Escape') {
      setIsEditing(false)
    }
  }

  return (
    <div style={{
      width: '100%',
      height: '48px',
      background: '#000',
      borderBottom: '1px solid rgba(255,255,255,0.06)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '0 16px',
      boxSizing: 'border-box',
      fontFamily: 'system-ui, -apple-system, sans-serif',
    }}>

      {/* Left — Logo + Workflow Name */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        <div
          onClick={() => navigate('/dashboard')}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            cursor: 'pointer',
          }}
        >
          <div style={{
            width: '26px',
            height: '26px',
            borderRadius: '7px',
            background: 'rgba(255,255,255,0.06)',
            border: '1px solid rgba(255,255,255,0.06)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
            </svg>
          </div>
          <span style={{
            color: '#fff',
            fontWeight: '600',
            fontSize: '14px',
            letterSpacing: '-0.3px',
          }}>
            DevOnboard
          </span>
        </div>

        <span style={{ color: 'rgba(255,255,255,0.08)', fontSize: '14px' }}>
          /
        </span>

        {isEditing ? (
          <input
            autoFocus
            defaultValue={workflowName}
            onBlur={handleNameBlur}
            onKeyDown={handleNameKeyDown}
            style={{
              background: 'rgba(255,255,255,0.03)',
              border: '1px solid rgba(255,255,255,0.12)',
              borderRadius: '6px',
              color: '#fff',
              fontSize: '13px',
              padding: '4px 8px',
              outline: 'none',
              width: '220px',
              fontFamily: 'inherit',
            }}
          />
        ) : (
          <span
            onClick={handleNameClick}
            title='Click to edit'
            style={{
              color: 'rgba(255,255,255,0.4)',
              fontSize: '13px',
              cursor: 'pointer',
              padding: '4px 8px',
              borderRadius: '6px',
              border: '1px solid transparent',
              transition: 'all 0.15s ease',
            }}
            onMouseEnter={(e) => {
              e.target.style.border = '1px solid rgba(255,255,255,0.08)'
              e.target.style.color = '#fff'
            }}
            onMouseLeave={(e) => {
              e.target.style.border = '1px solid transparent'
              e.target.style.color = 'rgba(255,255,255,0.4)'
            }}
          >
            {workflowName}
          </span>
        )}
      </div>

      {/* Right — Save status + Buttons */}
      <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>

        {lastSavedAt && !saving && (
          <span style={{ color: 'rgba(255,255,255,0.3)', fontSize: '11px' }}>
            Saved {new Date(lastSavedAt).toLocaleTimeString()}
          </span>
        )}

        <button
          onClick={handleSave}
          disabled={saving}
          style={{
            background: 'transparent',
            border: '1px solid rgba(255,255,255,0.06)',
            borderRadius: '7px',
            color: 'rgba(255,255,255,0.5)',
            padding: '5px 14px',
            fontSize: '13px',
            cursor: saving ? 'not-allowed' : 'pointer',
            opacity: saving ? 0.5 : 1,
            fontFamily: 'inherit',
            transition: 'all 0.15s ease',
          }}
          onMouseEnter={(e) => {
            if (!saving) {
              e.target.style.borderColor = 'rgba(255,255,255,0.12)'
              e.target.style.color = '#fff'
            }
          }}
          onMouseLeave={(e) => {
            if (!saving) {
              e.target.style.borderColor = 'rgba(255,255,255,0.06)'
              e.target.style.color = 'rgba(255,255,255,0.5)'
            }
          }}
        >
          {saving ? 'Saving...' : 'Save'}
        </button>

        <button
          style={{
            background: '#fff',
            border: 'none',
            borderRadius: '7px',
            color: '#000',
            padding: '5px 14px',
            fontSize: '13px',
            cursor: 'pointer',
            fontWeight: '600',
            fontFamily: 'inherit',
            transition: 'all 0.15s ease',
          }}
          onMouseEnter={(e) => {
            e.target.style.background = 'rgba(255,255,255,0.85)'
          }}
          onMouseLeave={(e) => {
            e.target.style.background = '#fff'
          }}
        >
          Run
        </button>
      </div>

    </div>
  )
}

export default Topbar