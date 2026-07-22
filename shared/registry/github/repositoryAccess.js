export const repositoryAccessNode = Object.freeze({
  id: 'github.repositoryAccess',
  version: 1,
  provider: 'github',
  category: 'GitHub',
  label: 'Repository Access',
  description: 'Grant access to one or more repositories',
  iconName: 'key',
  inputs: [
    {
      key: 'organization',
      label: 'Organisation Name',
      type: 'text',
      placeholder: 'e.g. my-company',
      required: true,
    },
    {
      key: 'repositories',
      label: 'Repositories',
      type: 'tags',
      placeholder: 'Type repo name + Enter',
      required: true,
    },
    {
      key: 'role',
      label: 'Permission',
      type: 'select',
      options: ['pull', 'push', 'admin', 'maintain', 'triage'],
      default: 'push',
      required: false,
    },
  ],
})
