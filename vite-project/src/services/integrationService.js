import api from './api'

export async function connectGithub(code) {
  const response = await api.post('/integrations/github/connect', { code })
  return response.data
}

export async function getIntegrationsStatus() {
  const response = await api.get('/integrations/status')
  return response.data
}

export async function disconnectIntegration(provider) {
  const response = await api.delete(`/integrations/${provider}`)
  return response.data
}

/**
 * Fetch the list of Slack channels available to the authenticated user.
 * Backend: GET /api/v1/integrations/slack/channels
 * @returns {Promise<Array<{id: string, name: string, isPrivate: boolean}>>}
 */
export async function getSlackChannels() {
  const response = await api.get('/integrations/slack/channels')
  return response.data.channels
}