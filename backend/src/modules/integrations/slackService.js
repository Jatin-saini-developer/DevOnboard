import axios from 'axios'
import Integration from '../../models/Integration.model.js'
import ApiError from '../../utils/ApiError.js'
import logger from '../../config/logger.js'

const SLACK_CLIENT_ID = process.env.SLACK_CLIENT_ID
const SLACK_CLIENT_SECRET = process.env.SLACK_CLIENT_SECRET
const SLACK_REDIRECT_URI = process.env.SLACK_REDIRECT_URI

// ─────────────────────────────────────────────────────────────────────────────
//  CONNECT SLACK
//  — Frontend se "code" aata hai, Slack ko exchange karte hain
//  — real access_token ke liye, phir database mein save
// ─────────────────────────────────────────────────────────────────────────────
export const connectSlackService = async ({ code, userId }) => {

  // Step 1 — Slack ko code bhejo, access_token wapas maango
  let tokenResponse
  try {
    tokenResponse = await axios.post(
      'https://slack.com/api/oauth.v2.access',
      new URLSearchParams({
        client_id: SLACK_CLIENT_ID,
        client_secret: SLACK_CLIENT_SECRET,
        code,
        redirect_uri: SLACK_REDIRECT_URI,
      }),
      {
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      }
    )
  } catch (error) {
    logger.error(`Slack token exchange failed: ${error.message}`)
    throw new ApiError(502, 'Failed to connect to Slack')
  }

  const { ok, access_token, authed_user, team, error: slackError } = tokenResponse.data

  if (!ok || slackError || !access_token) {
    logger.error(`Slack OAuth error: ${slackError}`)
    throw new ApiError(400, 'Slack authorization failed or code expired')
  }

  // Step 2 — Access token se Slack user ki info nikaalo
  // (taaki username dikha sakein UI mein, "Connected as @username")
  let slackUser
  try {
    const userResponse = await axios.get('https://slack.com/api/auth.test', {
      headers: { Authorization: `Bearer ${access_token}` },
    })
    slackUser = userResponse.data
  } catch (error) {
    logger.error(`Failed to fetch Slack user info: ${error.message}`)
    throw new ApiError(502, 'Failed to fetch Slack user details')
  }

  if (!slackUser.ok) {
    throw new ApiError(502, 'Slack user verification failed')
  }

  // Step 3 — Database mein save karo (ya update karo agar already exist karta hai)
  const integration = await Integration.findOneAndUpdate(
    { userId, provider: 'slack' },
    {
      accessToken: access_token,
      providerAccountId: slackUser.user_id,
      providerUsername: slackUser.user,
      isActive: true,
      metadata: {
        workspaceId: team?.id ?? null,
        workspaceName: team?.name ?? null,
      },
    },
    {
      upsert: true,       // agar exist nahi karta, naya bana do
      new: true,          // updated document wapas do
      runValidators: true,
    }
  )

  logger.info(`Slack connected for user: ${userId} as @${slackUser.user} (workspace: ${team?.id})`)

  return {
    provider: 'slack',
    username: slackUser.user,
    workspaceId: team?.id ?? null,
    workspaceName: team?.name ?? null,
    connectedAt: integration.updatedAt,
  }
}
