import { Handle, Position } from '@xyflow/react'
import NodeWrapper from './NodeWrapper'

function GithubNode({ id, data }) {
  return (
    <NodeWrapper id={id}>
      <div style={{
        background: 'rgba(255,255,255,0.02)',
        border: '1px solid rgba(255,255,255,0.08)',
        borderRadius: '10px',
        padding: '12px 20px',
        minWidth: '180px',
        textAlign: 'center',
        color: '#fff',
        fontFamily: 'system-ui, -apple-system, sans-serif',
        transition: 'all 0.15s ease',
      }}>
        <Handle type="target" position={Position.Top} />
        <div style={{ fontSize: '20px', marginBottom: '6px' }}>🐙</div>
        <div style={{ fontSize: '13px', fontWeight: '600' }}>GitHub</div>
        <div style={{ fontSize: '11px', color: 'rgba(255,255,255,0.4)', marginTop: '4px' }}>
          {data.label}
        </div>
        <Handle type="source" position={Position.Bottom} />
      </div>
    </NodeWrapper>
  )
}

export default GithubNode