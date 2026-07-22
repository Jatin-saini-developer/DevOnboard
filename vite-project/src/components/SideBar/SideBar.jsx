import { nodeRegistry } from '../../../../shared/registry/nodeRegistry.js'
import frontendBindings from '../../registry/bindings'

function Sidebar() {
  const categories = nodeRegistry.getCategories()

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

      {categories.map((catGroup) => (
        <div key={catGroup.category} style={{ marginTop: '8px', marginBottom: '4px' }}>
          <p style={{
            color: 'rgba(255,255,255,0.4)',
            fontSize: '11px',
            fontWeight: '600',
            textTransform: 'uppercase',
            letterSpacing: '0.08em',
            margin: '8px 0 6px 6px',
          }}>
            {catGroup.category}
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
            {catGroup.items.map((nodeDef) => {
              const icon = frontendBindings.getIcon(nodeDef.iconName || nodeDef.id)
              return (
                <div
                  key={nodeDef.id}
                  draggable
                  onDragStart={(e) => onDragStart(e, nodeDef.id)}
                  style={{
                    background: 'rgba(255,255,255,0.02)',
                    border: '1px solid rgba(255,255,255,0.06)',
                    borderRadius: '8px',
                    padding: '8px 10px',
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
                  <span style={{ fontSize: '16px' }}>{icon}</span>
                  <div>
                    <div style={{ fontSize: '12px', fontWeight: '500' }}>
                      {nodeDef.label}
                    </div>
                    <div style={{ fontSize: '10px', color: 'rgba(255,255,255,0.25)' }}>
                      {nodeDef.description}
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      ))}
    </div>
  )
}

export default Sidebar