import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import Canvas from '../components/Canvas/Canvas'
import Sidebar from '../components/SideBar/SideBar'
import Topbar from '../components/TopBar/Topbar'
import ConfigPanel from '../components/ConfigPanel/ConfigPanel'
import {
  fetchWorkflowById,
  resetWorkflow,
  selectWorkflowLoading,
} from '../store/WorkFlowSlice'

function WorkflowEditor() {
  const { id } = useParams()
  const dispatch = useDispatch()
  const loading = useSelector(selectWorkflowLoading)

  useEffect(() => {
    dispatch(fetchWorkflowById(id))

    // Component unmount hone pe — agar dashboard pe wapas jaaye
    // toh purana data clear ho jaaye
    return () => {
      dispatch(resetWorkflow())
    }
  }, [id, dispatch])

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-black">
        <p className="text-neutral-500 text-sm">Loading workflow...</p>
      </div>
    )
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
      <Topbar />
      <div style={{ display: 'flex', flex: 1, overflow: 'hidden', position: 'relative' }}>
        <Sidebar />
        <div style={{ flex: 1 }}>
          <Canvas />
        </div>
        <ConfigPanel />
      </div>
    </div>
  )
}

export default WorkflowEditor