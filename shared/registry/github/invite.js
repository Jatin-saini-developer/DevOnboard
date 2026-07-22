export const inviteNode = Object.freeze({
  id: 'github.invite',
  version: 1,
  provider: 'github',
  category: 'GitHub',
  label: 'Invite Member',
  description: 'Invite a user to a GitHub organisation',
  iconName: 'github',
  inputs: [
    {
      key: 'organization',
      label: 'Organisation Name',
      type: 'text',
      placeholder: 'e.g. my-company',
      required: true,
    },
    {
      key: 'role',
      label: 'Role',
      type: 'select',
      // Official GitHub API values for POST /orgs/{org}/invitations
      options: ['direct_member', 'admin', 'billing_manager'],
      default: 'direct_member',
      required: false,
    },
  ],
})
