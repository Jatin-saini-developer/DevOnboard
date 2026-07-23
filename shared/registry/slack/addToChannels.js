export const addToChannelsNode = Object.freeze({
  id: 'slack.addToChannels',
  version: 1,
  provider: 'slack',
  category: 'Slack',
  label: 'Add User To Channels',
  description: 'Add a new hire to one or more Slack channels',
  iconName: 'slack',
  inputs: [
    {
      key: 'channelIds',
      label: 'Channels',
      type: 'channelSelect',
      required: true,
    },
  ],
})
