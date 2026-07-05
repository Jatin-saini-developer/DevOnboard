import { useDispatch, useSelector } from 'react-redux'
import { setNodes, setEdges, setSelectedNode } from '../../store/WorkFlowSlice'

function NodeWrapper({ id, children }) {
  const dispatch = useDispatch()
  const nodes = useSelector((state) => state.workflow.nodes)
  const edges = useSelector((state) => state.workflow.edges)

  const handleDelete = (e) => {
    e.stopPropagation()
    const updatedNodes = nodes.filter((n) => n.id !== id)
    const updatedEdges = edges.filter(
      (edge) => edge.source !== id && edge.target !== id
    )
    dispatch(setNodes(updatedNodes))
    dispatch(setEdges(updatedEdges))
    dispatch(setSelectedNode(null))
  }

  return (
    <div style={{ position: 'relative' }}>
      {/* Delete button */}
      <div
        onClick={handleDelete}
        style={{
          position: 'absolute',
          top: '-8px',
          right: '-8px',
          width: '18px',
          height: '18px',
          background: 'rgba(255,255,255,0.08)',
          border: '1px solid rgba(255,255,255,0.1)',
          borderRadius: '50%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          fontSize: '9px',
          color: 'rgba(255,255,255,0.5)',
          fontWeight: '700',
          zIndex: 10,
          lineHeight: 1,
          transition: 'all 0.15s ease',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.background = 'rgba(239,68,68,0.15)'
          e.currentTarget.style.borderColor = 'rgba(239,68,68,0.3)'
          e.currentTarget.style.color = '#ef4444'
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.background = 'rgba(255,255,255,0.08)'
          e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)'
          e.currentTarget.style.color = 'rgba(255,255,255,0.5)'
        }}
      >
        ✕
      </div>
      {children}
    </div>
  )
}

export default NodeWrapper