export const triggerNode = Object.freeze({
  id: 'trigger',
  version: 1,
  provider: 'trigger',
  category: 'Triggers',
  label: 'New Dev Joins',
  description: 'Start the workflow when a new developer joins',
  iconName: 'zap',
  inputs: [
    {
      key: 'label',
      label: 'Trigger Name',
      type: 'text',
      placeholder: 'e.g. New Dev Joins',
      required: true,
    },
    {
      key: 'description',
      label: 'Description',
      type: 'text',
      placeholder: 'What triggers this workflow?',
      required: false,
    },
  ],
})
