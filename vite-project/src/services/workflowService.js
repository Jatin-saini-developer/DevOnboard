/**
 * workflowService.js — Workflow API calls
 *
 * Saare workflow related HTTP requests yahan rehte hain.
 * Dashboard aur WorkflowEditor pages yahan se import karenge.
 */

import api from './api'

export async function getWorkflows({ page = 1, limit = 10 } = {}) {
  const response = await api.get(`/workflows?page=${page}&limit=${limit}`)
  return response.data
}

export async function createWorkflow({ name, description }) {
  const response = await api.post('/workflows', { name, description })
  return response.data
}

export async function deleteWorkflow(workflowId) {
  const response = await api.delete(`/workflows/${workflowId}`)
  return response.data
}

export async function getWorkflowById(workflowId) {
  const response = await api.get(`/workflows/${workflowId}`)
  return response.data
}

export async function updateWorkflow(workflowId, payload) {
  const response = await api.put(`/workflows/${workflowId}`, payload)
  return response.data
}

export async function executeWorkflow(workflowId, triggerData) {
  const response = await api.post(`/workflows/${workflowId}/execute`, { triggerData })
  return response.data
}