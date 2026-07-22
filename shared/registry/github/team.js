export const teamNode = Object.freeze({
  id: 'github.team',
  version: 1,
  provider: 'github',
  category: 'GitHub',
  label: 'Team Membership',
  description: 'Add user to a GitHub team',
  iconName: 'users',
  inputs: [
    {
      key: 'organization',
      label: 'Organisation Name',
      type: 'text',
      placeholder: 'e.g. my-company',
      required: true,
    },
    {
      key: 'team',
      label: 'Team Slug',
      type: 'text',
      placeholder: 'e.g. engineering',
      required: true,
    },
    {
      key: 'role',
      label: 'Role',
      type: 'select',
      options: ['member', 'maintainer'],
      default: 'member',
      required: false,
    },
  ],
})
