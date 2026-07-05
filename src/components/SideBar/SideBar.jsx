const nodeList = [
  {
    type: 'trigger',
    label: 'Trigger',
    icon: '⚡',
    description: 'Start the workflow',
  },
  {
    type: 'github',
    label: 'GitHub',
    icon: '🐙',
    description: 'Add to GitHub Org',
  },
  {
    type: 'slack',
    label: 'Slack',
    icon: '💬',
    description: 'Add to Slack Channels',
  },
  {
    type: 'jira',
    label: 'Jira',
    icon: '📋',
    description: 'Add to Jira Project',
  },
  {
    type: 'notion',
    label: 'Notion',
    icon: '📝',
    description: 'Send Notion Docs',
  },
]

function Sidebar() {
  const onDragStart = (event, nodeType) => {
    event.dataTransfer.setData('application/reactflow', nodeType)
    event.dataTransfer.effectAllowed = 'move'
  }

  return (
    <div style={{
      width: '220px',
      height: '100%',
      background: '#000',
      borderRight: '1px solid rgba(255,255,255,0.06)',
      padding: '14px 10px',
      display: 'flex',
      flexDirection: 'column',
      gap: '4px',
      fontFamily: 'system-ui, -apple-system, sans-serif',
      boxSizing: 'border-box',
    }}>
      <p style={{
        color: 'rgba(255,255,255,0.3)',
        fontSize: '11px',
        fontWeight: '500',
        textTransform: 'uppercase',
        letterSpacing: '0.1em',
        margin: '0 0 8px 6px',
      }}>
        Nodes
      </p>

      {nodeList.map((node) => (
        <div
          key={node.type}
          draggable
          onDragStart={(e) => onDragStart(e, node.type)}
          style={{
            background: 'rgba(255,255,255,0.02)',
            border: '1px solid rgba(255,255,255,0.06)',
            borderRadius: '8px',
            padding: '10px 12px',
            cursor: 'grab',
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            color: 'rgba(255,255,255,0.7)',
            transition: 'all 0.15s ease',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = 'rgba(255,255,255,0.04)'
            e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)'
            e.currentTarget.style.color = '#fff'
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = 'rgba(255,255,255,0.02)'
            e.currentTarget.style.borderColor = 'rgba(255,255,255,0.06)'
            e.currentTarget.style.color = 'rgba(255,255,255,0.7)'
          }}
        >
          <span style={{ fontSize: '18px' }}>{node.icon}</span>
          <div>
            <div style={{ fontSize: '13px', fontWeight: '500' }}>
              {node.label}
            </div>
            <div style={{ fontSize: '11px', color: 'rgba(255,255,255,0.25)' }}>
              {node.description}
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

export default Sidebar