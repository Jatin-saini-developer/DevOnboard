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