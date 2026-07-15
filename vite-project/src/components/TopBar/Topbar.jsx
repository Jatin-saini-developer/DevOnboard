import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import {
  setWorkflowName,
  saveWorkflow,
  runWorkflow,
  clearExecutionResult,
  selectWorkflowName,
  selectWorkflowSaving,
  selectLastSavedAt,
  selectWorkflowExecuting,
  selectExecutionResult,
  selectExecutionError,
} from '../../store/WorkFlowSlice'

function Topbar() {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const workflowName = useSelector(selectWorkflowName)
  const saving = useSelector(selectWorkflowSaving)
  const lastSavedAt = useSelector(selectLastSavedAt)
  const executing = useSelector(selectWorkflowExecuting)
  const executionResult = useSelector(selectExecutionResult)
  const executionError = useSelector(selectExecutionError)

  const [isEditing, setIsEditing] = useState(false)
  const [showRunModal, setShowRunModal] = useState(false)
  const [triggerForm, setTriggerForm] = useState({
    name: '',
    email: '',
    githubUsername: '',
  })

  // Auto-close modal on success after 5 seconds
  useEffect(() => {
    if (executionResult && !executionError) {
      const timer = setTimeout(() => {
        setShowRunModal(false)
        dispatch(clearExecutionResult())
      }, 8000)
      return () => clearTimeout(timer)
    }
  }, [executionResult, executionError, dispatch])

  const handleSave = async () => {
    await dispatch(saveWorkflow())
  }

  const handleRunClick = () => {
    dispatch(clearExecutionResult())
    setTriggerForm({ name: '', email: '', githubUsername: '' })
    setShowRunModal(true)
  }

  const handleRunSubmit = async (e) => {
    e.preventDefault()
    const payload = {
      name: triggerForm.name.trim(),
      email: triggerForm.email.trim(),
    }
    if (triggerForm.githubUsername.trim()) {
      payload.githubUsername = triggerForm.githubUsername.trim()
    }
    await dispatch(runWorkflow(payload))
  }

  const handleCloseModal = () => {
    setShowRunModal(false)
    dispatch(clearExecutionResult())
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

  const isFormValid = triggerForm.name.trim() && triggerForm.email.trim()

  return (
    <>
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
            id="run-workflow-btn"
            onClick={handleRunClick}
            disabled={executing}
            style={{
              background: executing ? 'rgba(255,255,255,0.7)' : '#fff',
              border: 'none',
              borderRadius: '7px',
              color: '#000',
              padding: '5px 14px',
              fontSize: '13px',
              cursor: executing ? 'not-allowed' : 'pointer',
              fontWeight: '600',
              fontFamily: 'inherit',
              transition: 'all 0.15s ease',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
            }}
            onMouseEnter={(e) => {
              if (!executing) {
                e.currentTarget.style.background = 'rgba(255,255,255,0.85)'
              }
            }}
            onMouseLeave={(e) => {
              if (!executing) {
                e.currentTarget.style.background = '#fff'
              }
            }}
          >
            {executing && (
              <span style={{
                width: '12px',
                height: '12px',
                border: '2px solid rgba(0,0,0,0.15)',
                borderTopColor: '#000',
                borderRadius: '50%',
                display: 'inline-block',
                animation: 'topbar-spin 0.6s linear infinite',
              }} />
            )}
            {executing ? 'Running...' : 'Run'}
          </button>
        </div>

      </div>

      {/* ─── Run Workflow Modal ──────────────────────────────────────────── */}
      {showRunModal && (
        <div
          id="run-modal-overlay"
          onClick={(e) => {
            if (e.target.id === 'run-modal-overlay') handleCloseModal()
          }}
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(0,0,0,0.6)',
            backdropFilter: 'blur(4px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 9999,
            fontFamily: 'system-ui, -apple-system, sans-serif',
            animation: 'topbar-fadeIn 0.15s ease',
          }}
        >
          <div style={{
            background: '#0a0a0a',
            border: '1px solid rgba(255,255,255,0.08)',
            borderRadius: '14px',
            width: '440px',
            maxHeight: '85vh',
            overflow: 'auto',
            animation: 'topbar-slideUp 0.2s ease',
          }}>

            {/* Modal Header */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '16px 20px',
              borderBottom: '1px solid rgba(255,255,255,0.06)',
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <div style={{
                  width: '28px',
                  height: '28px',
                  borderRadius: '8px',
                  background: executionResult
                    ? (executionResult?.data?.execution?.status === 'completed'
                        ? 'rgba(52,211,153,0.12)'
                        : 'rgba(251,113,133,0.12)')
                    : 'rgba(255,255,255,0.04)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                  {executionResult ? (
                    executionResult?.data?.execution?.status === 'completed' ? (
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#34d399" strokeWidth="2.5">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                    ) : (
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#fb7185" strokeWidth="2.5">
                        <line x1="18" y1="6" x2="6" y2="18" />
                        <line x1="6" y1="6" x2="18" y2="18" />
                      </svg>
                    )
                  ) : (
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.4)" strokeWidth="2">
                      <polygon points="5 3 19 12 5 21 5 3" />
                    </svg>
                  )}
                </div>
                <span style={{
                  color: '#fff',
                  fontSize: '14px',
                  fontWeight: '600',
                  letterSpacing: '-0.3px',
                }}>
                  {executionResult ? 'Execution Result' : 'Run Workflow'}
                </span>
              </div>
              <button
                onClick={handleCloseModal}
                style={{
                  background: 'rgba(255,255,255,0.04)',
                  border: '1px solid rgba(255,255,255,0.06)',
                  borderRadius: '6px',
                  color: 'rgba(255,255,255,0.4)',
                  width: '28px',
                  height: '28px',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '16px',
                  transition: 'all 0.15s ease',
                }}
                onMouseEnter={(e) => {
                  e.target.style.color = '#fff'
                  e.target.style.borderColor = 'rgba(255,255,255,0.12)'
                }}
                onMouseLeave={(e) => {
                  e.target.style.color = 'rgba(255,255,255,0.4)'
                  e.target.style.borderColor = 'rgba(255,255,255,0.06)'
                }}
              >
                ×
              </button>
            </div>

            {/* Modal Body */}
            <div style={{ padding: '20px' }}>

              {/* ── Error State ────────────────────────────────────────────── */}
              {executionError && (
                <div style={{
                  background: 'rgba(251,113,133,0.06)',
                  border: '1px solid rgba(251,113,133,0.15)',
                  borderRadius: '10px',
                  padding: '14px 16px',
                  marginBottom: '16px',
                }}>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    marginBottom: '6px',
                  }}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#fb7185" strokeWidth="2">
                      <circle cx="12" cy="12" r="10" />
                      <line x1="12" y1="8" x2="12" y2="12" />
                      <line x1="12" y1="16" x2="12.01" y2="16" />
                    </svg>
                    <span style={{ color: '#fb7185', fontSize: '13px', fontWeight: '600' }}>
                      Execution Failed
                    </span>
                  </div>
                  <p style={{
                    color: 'rgba(251,113,133,0.8)',
                    fontSize: '12px',
                    margin: 0,
                    lineHeight: '1.5',
                  }}>
                    {typeof executionError === 'string' ? executionError : 'An unexpected error occurred'}
                  </p>
                </div>
              )}

              {/* ── Execution Result ───────────────────────────────────────── */}
              {executionResult && (
                <ExecutionResultView result={executionResult} />
              )}

              {/* ── Trigger Data Form (only when no result yet) ────────── */}
              {!executionResult && (
                <form onSubmit={handleRunSubmit}>
                  <p style={{
                    color: 'rgba(255,255,255,0.35)',
                    fontSize: '12px',
                    margin: '0 0 16px 0',
                    lineHeight: '1.5',
                  }}>
                    Enter the new developer details to trigger the onboarding workflow.
                  </p>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    <InputField
                      id="trigger-name"
                      label="Developer Name"
                      placeholder="e.g. Rahul Sharma"
                      value={triggerForm.name}
                      onChange={(v) => setTriggerForm({ ...triggerForm, name: v })}
                      required
                    />
                    <InputField
                      id="trigger-email"
                      label="Email Address"
                      type="email"
                      placeholder="e.g. rahul@company.com"
                      value={triggerForm.email}
                      onChange={(v) => setTriggerForm({ ...triggerForm, email: v })}
                      required
                    />
                    <InputField
                      id="trigger-github"
                      label="GitHub Username"
                      placeholder="e.g. rahulsharma (optional)"
                      value={triggerForm.githubUsername}
                      onChange={(v) => setTriggerForm({ ...triggerForm, githubUsername: v })}
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={!isFormValid || executing}
                    style={{
                      width: '100%',
                      marginTop: '20px',
                      padding: '10px 0',
                      borderRadius: '8px',
                      border: 'none',
                      background: isFormValid && !executing
                        ? '#fff'
                        : 'rgba(255,255,255,0.06)',
                      color: isFormValid && !executing
                        ? '#000'
                        : 'rgba(255,255,255,0.2)',
                      fontWeight: '600',
                      fontSize: '13px',
                      cursor: isFormValid && !executing ? 'pointer' : 'not-allowed',
                      fontFamily: 'inherit',
                      transition: 'all 0.2s ease',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '8px',
                    }}
                  >
                    {executing && (
                      <span style={{
                        width: '14px',
                        height: '14px',
                        border: '2px solid rgba(0,0,0,0.15)',
                        borderTopColor: '#000',
                        borderRadius: '50%',
                        display: 'inline-block',
                        animation: 'topbar-spin 0.6s linear infinite',
                      }} />
                    )}
                    {executing ? 'Executing workflow...' : 'Execute Workflow'}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      )}

      {/* ─── Keyframe animations ───────────────────────────────────────── */}
      <style>{`
        @keyframes topbar-spin {
          to { transform: rotate(360deg); }
        }
        @keyframes topbar-fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes topbar-slideUp {
          from { opacity: 0; transform: translateY(12px) scale(0.97); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
        @keyframes topbar-stepAppear {
          from { opacity: 0; transform: translateX(-6px); }
          to { opacity: 1; transform: translateX(0); }
        }
      `}</style>
    </>
  )
}

// ─── Reusable Input Field ──────────────────────────────────────────────────────
function InputField({ id, label, type = 'text', placeholder, value, onChange, required }) {
  return (
    <div>
      <label
        htmlFor={id}
        style={{
          display: 'block',
          color: 'rgba(255,255,255,0.5)',
          fontSize: '12px',
          fontWeight: '500',
          marginBottom: '6px',
          letterSpacing: '0.02em',
        }}
      >
        {label} {required && <span style={{ color: 'rgba(251,113,133,0.6)' }}>*</span>}
      </label>
      <input
        id={id}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        required={required}
        style={{
          width: '100%',
          padding: '9px 12px',
          background: 'rgba(255,255,255,0.03)',
          border: '1px solid rgba(255,255,255,0.08)',
          borderRadius: '8px',
          color: '#fff',
          fontSize: '13px',
          outline: 'none',
          fontFamily: 'inherit',
          transition: 'border-color 0.15s ease',
          boxSizing: 'border-box',
        }}
        onFocus={(e) => {
          e.target.style.borderColor = 'rgba(255,255,255,0.2)'
        }}
        onBlur={(e) => {
          e.target.style.borderColor = 'rgba(255,255,255,0.08)'
        }}
      />
    </div>
  )
}

// ─── Execution Result View ────────────────────────────────────────────────────
function ExecutionResultView({ result }) {
  const execution = result?.data?.execution
  if (!execution) return null

  const isSuccess = execution.status === 'completed'
  const summary = execution.summary || {}

  return (
    <div>
      {/* Summary banner */}
      <div style={{
        background: isSuccess
          ? 'rgba(52,211,153,0.06)'
          : 'rgba(251,113,133,0.06)',
        border: `1px solid ${isSuccess ? 'rgba(52,211,153,0.15)' : 'rgba(251,113,133,0.15)'}`,
        borderRadius: '10px',
        padding: '14px 16px',
        marginBottom: '16px',
      }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: '10px',
        }}>
          <span style={{
            color: isSuccess ? '#34d399' : '#fb7185',
            fontSize: '13px',
            fontWeight: '600',
          }}>
            {isSuccess ? 'Workflow executed successfully' : 'Workflow execution failed'}
          </span>
          {execution.durationMs != null && (
            <span style={{
              color: 'rgba(255,255,255,0.3)',
              fontSize: '11px',
              fontFamily: 'monospace',
            }}>
              {execution.durationMs}ms
            </span>
          )}
        </div>

        {/* Stats row */}
        <div style={{
          display: 'flex',
          gap: '16px',
        }}>
          <StatPill label="Total" value={summary.totalNodes || 0} color="rgba(255,255,255,0.5)" />
          <StatPill label="Success" value={summary.successfulNodes || 0} color="#34d399" />
          <StatPill label="Failed" value={summary.failedNodes || 0} color="#fb7185" />
          <StatPill label="Skipped" value={summary.skippedNodes || 0} color="rgba(255,255,255,0.3)" />
        </div>
      </div>

      {/* Step-by-step results */}
      {execution.steps && execution.steps.length > 0 && (
        <div>
          <span style={{
            color: 'rgba(255,255,255,0.35)',
            fontSize: '11px',
            fontWeight: '600',
            textTransform: 'uppercase',
            letterSpacing: '0.06em',
            display: 'block',
            marginBottom: '10px',
          }}>
            Steps
          </span>
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '6px',
          }}>
            {execution.steps.map((step, i) => (
              <div
                key={step._id || i}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  padding: '10px 12px',
                  background: 'rgba(255,255,255,0.02)',
                  border: '1px solid rgba(255,255,255,0.04)',
                  borderRadius: '8px',
                  animation: `topbar-stepAppear 0.25s ease ${i * 0.06}s both`,
                }}
              >
                <StepStatusIcon status={step.status} />
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                  }}>
                    <span style={{
                      color: 'rgba(255,255,255,0.7)',
                      fontSize: '12px',
                      fontWeight: '500',
                    }}>
                      {step.nodeType}
                    </span>
                    <span style={{
                      color: 'rgba(255,255,255,0.2)',
                      fontSize: '10px',
                      fontFamily: 'monospace',
                    }}>
                      {step.nodeId?.slice(0, 8)}
                    </span>
                  </div>
                  {step.logs && step.logs.length > 0 && (
                    <p style={{
                      color: 'rgba(255,255,255,0.3)',
                      fontSize: '11px',
                      margin: '3px 0 0 0',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      whiteSpace: 'nowrap',
                    }}>
                      {step.logs[0]}
                    </p>
                  )}
                </div>
                {step.durationMs != null && (
                  <span style={{
                    color: 'rgba(255,255,255,0.2)',
                    fontSize: '10px',
                    fontFamily: 'monospace',
                    flexShrink: 0,
                  }}>
                    {step.durationMs}ms
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

// ─── Tiny sub-components ──────────────────────────────────────────────────────

function StatPill({ label, value, color }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
      <span style={{ color, fontSize: '13px', fontWeight: '700', fontFamily: 'monospace' }}>
        {value}
      </span>
      <span style={{ color: 'rgba(255,255,255,0.25)', fontSize: '11px' }}>
        {label}
      </span>
    </div>
  )
}

function StepStatusIcon({ status }) {
  const config = {
    success: { bg: 'rgba(52,211,153,0.12)', stroke: '#34d399', icon: 'check' },
    failed: { bg: 'rgba(251,113,133,0.12)', stroke: '#fb7185', icon: 'x' },
    skipped: { bg: 'rgba(255,255,255,0.04)', stroke: 'rgba(255,255,255,0.2)', icon: 'skip' },
    pending: { bg: 'rgba(255,255,255,0.04)', stroke: 'rgba(255,255,255,0.15)', icon: 'dot' },
  }
  const c = config[status] || config.pending

  return (
    <div style={{
      width: '22px',
      height: '22px',
      borderRadius: '6px',
      background: c.bg,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexShrink: 0,
    }}>
      {c.icon === 'check' && (
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke={c.stroke} strokeWidth="3">
          <polyline points="20 6 9 17 4 12" />
        </svg>
      )}
      {c.icon === 'x' && (
        <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke={c.stroke} strokeWidth="3">
          <line x1="18" y1="6" x2="6" y2="18" />
          <line x1="6" y1="6" x2="18" y2="18" />
        </svg>
      )}
      {c.icon === 'skip' && (
        <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke={c.stroke} strokeWidth="2.5">
          <polyline points="5 4 15 12 5 20 5 4" />
          <line x1="19" y1="5" x2="19" y2="19" />
        </svg>
      )}
      {c.icon === 'dot' && (
        <div style={{
          width: '6px',
          height: '6px',
          borderRadius: '50%',
          background: c.stroke,
        }} />
      )}
    </div>
  )
}

export default Topbar