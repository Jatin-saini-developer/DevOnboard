import { useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { logout } from '../store/authSlice'
import { logoutUser } from '../services/authService'
import {
  fetchWorkflows,
  addWorkflow,
  removeWorkflow,
  selectWorkflows,
  selectWorkflowListLoading,
  selectWorkflowListError,
} from '../store/workflowListSlice'

function Dashboard() {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const workflows = useSelector(selectWorkflows)
  const loading = useSelector(selectWorkflowListLoading)
  const error = useSelector(selectWorkflowListError)

  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [selectedWorkflow, setSelectedWorkflow] = useState(null)

  // Fetch workflows once when the Dashboard mounts (and on refresh)
  useEffect(() => {
    dispatch(fetchWorkflows({ page: 1, limit: 10 }))
  }, [dispatch])

  const handleLogout = async () => {
    try {
      await logoutUser()
    } catch {
      // Even if the API call fails (e.g. expired token), we still log out locally
    }
    dispatch(logout())
    navigate('/login')
  }

  const handleNewWorkflow = async () => {
    const result = await dispatch(addWorkflow({
      name: 'Untitled Workflow',
      description: '',
    }))

    if (addWorkflow.fulfilled.match(result)) {
      const newWorkflow = result.payload.workflow
      navigate(`/workflow/${newWorkflow._id}`)
    }
  }

  const handleOpenWorkflow = (id) => {
    navigate(`/workflow/${id}`)
  }

  const handleDeleteClick = (e, workflow) => {
    e.stopPropagation()
    setSelectedWorkflow(workflow)
    setShowDeleteModal(true)
  }

  const handleDeleteConfirm = async () => {
    await dispatch(removeWorkflow(selectedWorkflow._id))
    setShowDeleteModal(false)
    setSelectedWorkflow(null)
  }

  const handleDeleteCancel = () => {
    setShowDeleteModal(false)
    setSelectedWorkflow(null)
  }

  return (
    <div className="min-h-screen bg-black">

      {/* Topbar */}
      <div className="border-b border-white/[0.06] px-6 py-3.5 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2.5">
          <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-white/[0.08] border border-white/[0.06]">
            <svg className="w-3.5 h-3.5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
            </svg>
          </div>
          <span className="text-[15px] font-semibold tracking-tight text-white">
            DevOnboard
          </span>
        </Link>
        <div className="flex items-center gap-4">
          <span className="text-neutral-600 text-[13px]">My Workspace</span>
          <button
            onClick={handleLogout}
            className="text-neutral-500 hover:text-white text-[13px] border border-white/[0.06] hover:border-white/[0.12] rounded-lg px-3.5 py-1.5 transition-all duration-200"
          >
            Logout
          </button>
        </div>
      </div>

      {/* Main content */}
      <div className="max-w-6xl mx-auto px-6 py-10">

        {/* Header row */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-white text-xl font-semibold tracking-tight">
              My Workflows
            </h2>
            <p className="text-neutral-600 text-[13px] mt-1">
              {workflows.length} workflow{workflows.length !== 1 ? 's' : ''}
            </p>
          </div>
          <button
            onClick={handleNewWorkflow}
            className="bg-white hover:bg-neutral-200 text-black text-[13px] font-semibold rounded-lg px-4 py-2 transition-all duration-200 flex items-center gap-1.5"
          >
            <span className="text-base leading-none">+</span>
            New Workflow
          </button>
        </div>

        {/* Error banner */}
        {error && (
          <div className="bg-red-500/[0.06] border border-red-500/[0.1] text-red-400/80 text-[13px] rounded-lg px-4 py-3 mb-5">
            {error}
          </div>
        )}

        {/* Loading / Empty / Grid */}
        {loading ? (
          <div className="text-center py-24">
            <p className="text-neutral-500 text-sm">Loading workflows...</p>
          </div>
        ) : workflows.length === 0 ? (
          <div className="text-center py-24">
            <div className="text-4xl mb-4">⚡</div>
            <p className="text-neutral-300 text-base font-medium">
              No workflows yet
            </p>
            <p className="text-neutral-700 text-[13px] mt-2 mb-6">
              Create your first workflow to get started
            </p>
            <button
              onClick={handleNewWorkflow}
              className="bg-white hover:bg-neutral-200 text-black text-[13px] font-semibold rounded-lg px-5 py-2.5 transition-all duration-200"
            >
              Create Workflow
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {workflows.map((workflow) => (
              <div
                key={workflow._id}
                onClick={() => handleOpenWorkflow(workflow._id)}
                className="border border-white/[0.06] bg-white/[0.02] hover:border-white/[0.12] hover:bg-white/[0.03] rounded-xl p-6 cursor-pointer transition-all duration-200 group"
              >
                {/* Card header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="bg-white/[0.04] border border-white/[0.06] rounded-lg p-2">
                    <span className="text-lg">⚡</span>
                  </div>
                  <div className="flex items-center gap-2">
                    {/* Status badge */}
                    <span className={`text-[11px] font-medium px-2.5 py-1 rounded-full ${
                      workflow.status === 'active'
                        ? 'bg-emerald-500/[0.08] text-emerald-500/80 border border-emerald-500/[0.1]'
                        : 'bg-white/[0.03] text-neutral-600 border border-white/[0.06]'
                    }`}>
                      {workflow.status}
                    </span>
                    {/* Delete button */}
                    <button
                      onClick={(e) => handleDeleteClick(e, workflow)}
                      className="text-neutral-800 hover:text-red-400/80 transition-all duration-200 opacity-0 group-hover:opacity-100 text-sm leading-none"
                    >
                      ✕
                    </button>
                  </div>
                </div>

                {/* Card body */}
                <h3 className="text-neutral-200 text-[14px] font-semibold mb-1 group-hover:text-white transition-colors duration-200">
                  {workflow.name}
                </h3>
                <p className="text-neutral-600 text-[13px] mb-4 line-clamp-2">
                  {workflow.description || 'No description yet'}
                </p>

                {/* Card footer */}
                <div className="flex items-center justify-between pt-4 border-t border-white/[0.04]">
                  <span className="text-neutral-700 text-[11px]">
                    {workflow.nodeCount} node{workflow.nodeCount !== 1 ? 's' : ''}
                  </span>
                  <span className="text-neutral-700 text-[11px]">
                    {new Date(workflow.createdAt).toLocaleDateString()}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}

      </div>

      {/* Delete confirmation modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 px-4">
          <div className="border border-white/[0.06] bg-neutral-950 rounded-xl p-6 w-full max-w-sm">
            <h3 className="text-white text-base font-semibold mb-2">
              Delete Workflow
            </h3>
            <p className="text-neutral-500 text-[13px] mb-6 leading-relaxed">
              Are you sure you want to delete{' '}
              <span className="text-white font-medium">
                "{selectedWorkflow?.name}"
              </span>
              ? This action cannot be undone.
            </p>
            <div className="flex gap-3">
              <button
                onClick={handleDeleteCancel}
                className="flex-1 bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.06] text-neutral-300 text-[13px] font-medium rounded-lg px-4 py-2.5 transition-all duration-200"
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteConfirm}
                className="flex-1 bg-red-500/[0.1] hover:bg-red-500/[0.15] border border-red-500/[0.15] text-red-400/90 text-[13px] font-medium rounded-lg px-4 py-2.5 transition-all duration-200"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  )
}

export default Dashboard