import { useCallback, useRef } from 'react'
import {
  ReactFlow,
  Background,
  Controls,
  MiniMap,
  applyNodeChanges,
  applyEdgeChanges,
  addEdge,
  useReactFlow,
  ReactFlowProvider,
} from '@xyflow/react'
import { useDispatch, useSelector } from 'react-redux'
import { setNodes, setEdges, setSelectedNodeId } from '../../store/WorkFlowSlice'
import frontendBindings from '../../registry/bindings'
import '@xyflow/react/dist/style.css'

const nodeTypes = frontendBindings.getReactFlowNodeTypes()
const nodeLabels = frontendBindings.getReactFlowNodeLabels()

const defaultEdgeOptions = {
  animated: true,
  style: {
    stroke: 'rgba(255,255,255,0.15)',
    strokeWidth: 1.5,
  },
}

// ─── Inner component (has access to useReactFlow hook) ───────────────────────
function CanvasInner() {
  const dispatch = useDispatch()
  const nodes = useSelector((state) => state.workflow.nodes)
  const edges = useSelector((state) => state.workflow.edges)
  const { screenToFlowPosition } = useReactFlow()
  const idRef = useRef(10)

  const onNodesChange = useCallback((changes) => {
    dispatch(setNodes(applyNodeChanges(changes, nodes)))
  }, [dispatch, nodes])

  const onEdgesChange = useCallback((changes) => {
    dispatch(setEdges(applyEdgeChanges(changes, edges)))
  }, [dispatch, edges])

  const onConnect = useCallback((connection) => {
    dispatch(setEdges(addEdge(connection, edges)))
  }, [dispatch, edges])

  const onDragOver = useCallback((event) => {
    event.preventDefault()
    event.dataTransfer.dropEffect = 'move'
  }, [])

  const onDrop = useCallback((event) => {
    event.preventDefault()
    const type = event.dataTransfer.getData('application/reactflow')
    if (!type) return

    const position = screenToFlowPosition({
      x: event.clientX,
      y: event.clientY,
    })

    const newNode = {
      id: `${idRef.current++}`,
      type,
      position,
      data: {
        label: nodeLabels[type] || 'Node',
      },
    }

    dispatch(setNodes([...nodes, newNode]))
  }, [nodes, dispatch, screenToFlowPosition])

  const onNodeClick = useCallback((event, node) => {
    dispatch(setSelectedNodeId(node.id))
  }, [dispatch])

  const onPaneClick = useCallback(() => {
    dispatch(setSelectedNodeId(null))
  }, [dispatch])

  const isEmpty = nodes.length === 0

  return (
    <div style={{ width: '100%', height: '100%', position: 'relative', background: '#0a0a0a' }}>

      {/* Empty state — only shows when no nodes on canvas */}
      {isEmpty && (
        <div style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          zIndex: 5,
          textAlign: 'center',
          pointerEvents: 'none',
        }}>
          <div style={{ fontSize: '36px', marginBottom: '12px', opacity: 0.5 }}>⚡</div>
          <p style={{
            color: 'rgba(255,255,255,0.3)',
            fontSize: '14px',
            fontWeight: '500',
            margin: '0 0 6px',
            fontFamily: 'system-ui, -apple-system, sans-serif',
          }}>
            Start building your workflow
          </p>
          <p style={{
            color: 'rgba(255,255,255,0.15)',
            fontSize: '13px',
            margin: 0,
            fontFamily: 'system-ui, -apple-system, sans-serif',
          }}>
            Drag a node from the left sidebar to get started
          </p>
        </div>
      )}

      <ReactFlow
        nodes={nodes}
        edges={edges}
        nodeTypes={nodeTypes}
        defaultEdgeOptions={defaultEdgeOptions}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onDragOver={onDragOver}
        onDrop={onDrop}
        onNodeClick={onNodeClick}
        onPaneClick={onPaneClick}
        deleteKeyCode='Delete'
        fitView
        proOptions={{ hideAttribution: true }}
      >
        <Background color="rgba(255,255,255,0.03)" gap={20} size={1} />
        <Controls
          style={{
            background: '#0a0a0a',
            border: '1px solid rgba(255,255,255,0.06)',
            borderRadius: '8px',
          }}
        />
        <MiniMap
          style={{
            background: '#0a0a0a',
            border: '1px solid rgba(255,255,255,0.06)',
            borderRadius: '8px',
          }}
          maskColor="rgba(0,0,0,0.7)"
          nodeColor="rgba(255,255,255,0.15)"
        />
      </ReactFlow>

    </div>
  )
}

// ─── Outer component (wraps with ReactFlowProvider) ──────────────────────────
function Canvas() {
  return (
    <ReactFlowProvider>
      <CanvasInner />
    </ReactFlowProvider>
  )
}

export default Canvas