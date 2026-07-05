import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { getWorkflows, createWorkflow, deleteWorkflow } from '../services/workflowService'

const initialState = {
  workflows: [],
  pagination: null,
  loading: false,
  error: null,
}

export const fetchWorkflows = createAsyncThunk(
  'workflowList/fetchWorkflows',
  async (params, { rejectWithValue }) => {
    try {
      return await getWorkflows(params)
    } catch (err) {
      return rejectWithValue(err.message)
    }
  }
)

export const addWorkflow = createAsyncThunk(
  'workflowList/addWorkflow',
  async ({ name, description }, { rejectWithValue }) => {
    try {
      return await createWorkflow({ name, description })
    } catch (err) {
      return rejectWithValue(err.message)
    }
  }
)

export const removeWorkflow = createAsyncThunk(
  'workflowList/removeWorkflow',
  async (workflowId, { rejectWithValue }) => {
    try {
      await deleteWorkflow(workflowId)
      return workflowId
    } catch (err) {
      return rejectWithValue(err.message)
    }
  }
)

const workflowListSlice = createSlice({
  name: 'workflowList',
  initialState,
  reducers: {
    clearWorkflowListError(state) {
      state.error = null
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchWorkflows.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchWorkflows.fulfilled, (state, action) => {
        state.loading = false
        state.workflows = action.payload.workflows
        state.pagination = action.payload.pagination
      })
      .addCase(fetchWorkflows.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })

    builder
      .addCase(addWorkflow.fulfilled, (state, action) => {
        state.workflows.unshift(action.payload.workflow)
      })
      .addCase(addWorkflow.rejected, (state, action) => {
        state.error = action.payload
      })

    builder
      .addCase(removeWorkflow.fulfilled, (state, action) => {
        state.workflows = state.workflows.filter((w) => w._id !== action.payload)
      })
      .addCase(removeWorkflow.rejected, (state, action) => {
        state.error = action.payload
      })
  },
})

export const { clearWorkflowListError } = workflowListSlice.actions

export const selectWorkflows = (state) => state.workflowList.workflows
export const selectWorkflowListLoading = (state) => state.workflowList.loading
export const selectWorkflowListError = (state) => state.workflowList.error

export default workflowListSlice.reducer