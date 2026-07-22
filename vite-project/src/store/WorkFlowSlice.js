import { createSlice, createAsyncThunk, createSelector } from '@reduxjs/toolkit'
import { getWorkflowById, updateWorkflow, executeWorkflow } from '../services/workflowService'

const initialState = {
  currentWorkflowId: null,
  nodes: [],
  edges: [],
  selectedNodeId: null,
  workflowName: 'Untitled Workflow',
  loading: false,
  saving: false,
  error: null,
  lastSavedAt: null,
  executing: false,
  executionResult: null,
  executionError: null,
}

// ─── Async thunks ────────────────────────────────────────────────────────────

export const fetchWorkflowById = createAsyncThunk(
  'workflow/fetchWorkflowById',
  async (workflowId, { rejectWithValue }) => {
    try {
      return await getWorkflowById(workflowId)
    } catch (err) {
      return rejectWithValue(err.message)
    }
  }
)

export const saveWorkflow = createAsyncThunk(
  'workflow/saveWorkflow',
  async (_, { getState, rejectWithValue }) => {
    const { workflow } = getState()
    try {
      // [NODE-TRACE] Stage 2: Before save — log the exact nodes being sent
      const githubNodes = workflow.nodes.filter(n => n.type === 'github')
      console.log(`[NODE-TRACE] [2/8 saveWorkflow] Sending ${workflow.nodes.length} nodes to backend. GitHub nodes: ${githubNodes.length}`)
      githubNodes.forEach(n => {
        console.log(`[NODE-TRACE] [2/8 saveWorkflow] GitHub node:`, JSON.stringify({ id: n.id, type: n.type, data: n.data }, null, 2))
      })
      console.log(`[NODE-TRACE] [2/8 saveWorkflow] FULL nodes array:`, JSON.stringify(workflow.nodes.map(n => ({ id: n.id, type: n.type, data: n.data })), null, 2))

      const data = await updateWorkflow(workflow.currentWorkflowId, {
        name: workflow.workflowName,
        nodes: workflow.nodes,
        edges: workflow.edges,
      })
      return data
    } catch (err) {
      return rejectWithValue(err.message)
    }
  }
)

export const runWorkflow = createAsyncThunk(
  'workflow/runWorkflow',
  async (triggerData, { getState, rejectWithValue }) => {
    const { workflow } = getState()
    try {
      const data = await executeWorkflow(workflow.currentWorkflowId, triggerData)
      return data
    } catch (err) {
      return rejectWithValue(
        err?.data?.message || err.message || 'Execution failed'
      )
    }
  }
)

// ─── Slice ────────────────────────────────────────────────────────────────────

const workflowSlice = createSlice({
  name: 'workflow',
  initialState,
  reducers: {
    setNodes: (state, action) => {
      state.nodes = action.payload
    },
    setEdges: (state, action) => {
      state.edges = action.payload
    },
    setSelectedNodeId: (state, action) => {
      // Payload is a string node ID or null — never a full node object
      state.selectedNodeId = action.payload
    },
    updateNodeData: (state, action) => {
      const { id, data } = action.payload
      const node = state.nodes.find((n) => n.id === id)
      if (node) {
        node.data = { ...node.data, ...data }
      }
    },
    setWorkflowName: (state, action) => {
      state.workflowName = action.payload
    },
    // Naya canvas khulne se pehle purana data clear karo
    resetWorkflow: (state) => {
      state.currentWorkflowId = null
      state.nodes = []
      state.edges = []
      state.selectedNodeId = null
      state.workflowName = 'Untitled Workflow'
      state.error = null
      state.lastSavedAt = null
      state.executing = false
      state.executionResult = null
      state.executionError = null
    },
    clearExecutionResult: (state) => {
      state.executionResult = null
      state.executionError = null
    },
  },
  extraReducers: (builder) => {
    // ── fetchWorkflowById ─────────────────────────────────────────────
    builder
      .addCase(fetchWorkflowById.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchWorkflowById.fulfilled, (state, action) => {
        state.loading = false
        state.currentWorkflowId = action.payload._id
        state.workflowName = action.payload.name
        state.nodes = action.payload.nodes
        state.edges = action.payload.edges
      })
      .addCase(fetchWorkflowById.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })

    // ── saveWorkflow ──────────────────────────────────────────────────
    builder
      .addCase(saveWorkflow.pending, (state) => {
        state.saving = true
        state.error = null
      })
      .addCase(saveWorkflow.fulfilled, (state) => {
        state.saving = false
        state.lastSavedAt = new Date().toISOString()
      })
      .addCase(saveWorkflow.rejected, (state, action) => {
        state.saving = false
        state.error = action.payload
      })

    // ── runWorkflow ────────────────────────────────────────────────
    builder
      .addCase(runWorkflow.pending, (state) => {
        state.executing = true
        state.executionResult = null
        state.executionError = null
      })
      .addCase(runWorkflow.fulfilled, (state, action) => {
        state.executing = false
        state.executionResult = action.payload
      })
      .addCase(runWorkflow.rejected, (state, action) => {
        state.executing = false
        state.executionError = action.payload
      })
  },
})

export const {
  setNodes,
  setEdges,
  setSelectedNodeId,
  updateNodeData,
  setWorkflowName,
  resetWorkflow,
  clearExecutionResult,
} = workflowSlice.actions

// ─── Selectors ────────────────────────────────────────────────────────────────
export const selectNodes = (state) => state.workflow.nodes
export const selectEdges = (state) => state.workflow.edges
export const selectWorkflowName = (state) => state.workflow.workflowName
export const selectWorkflowLoading = (state) => state.workflow.loading
export const selectWorkflowSaving = (state) => state.workflow.saving
export const selectWorkflowError = (state) => state.workflow.error
export const selectLastSavedAt = (state) => state.workflow.lastSavedAt
export const selectWorkflowExecuting = (state) => state.workflow.executing
export const selectExecutionResult = (state) => state.workflow.executionResult
export const selectExecutionError = (state) => state.workflow.executionError

// ─── Selection Selectors ───────────────────────────────────────────────────────
// Single source of truth: selectedNodeId is a string ID stored in Redux.
// selectSelectedNode is memoized via createSelector: the result function only
// re-runs when nodes or selectedNodeId actually change reference/value.
export const selectSelectedNodeId = (state) => state.workflow.selectedNodeId
export const selectSelectedNode = createSelector(
  selectNodes,
  selectSelectedNodeId,
  (nodes, selectedNodeId) => nodes.find((n) => n.id === selectedNodeId) ?? null
)

export default workflowSlice.reducer
