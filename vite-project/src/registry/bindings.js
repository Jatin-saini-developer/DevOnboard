import { nodeRegistry } from '../../../shared/registry/nodeRegistry.js'
import TriggerNode from '../components/Nodes/TriggerNode'
import GithubNode from '../components/Nodes/GithubNode'
import SlackNode from '../components/Nodes/SlackNode'
import JiraNode from '../components/Nodes/JiraNode'
import NotionNode from '../components/Nodes/NotionNode'

/**
 * Frontend Binding Layer.
 *
 * Connects declarative shared node metadata (from shared/registry) to frontend-specific
 * concerns: React component rendering, visual icons/emojis, and ReactFlow configuration.
 */

// ─── Map node type -> React component ─────────────────────────────────────────
const componentMap = {
  trigger: TriggerNode,

  // Namespaced GitHub node types
  'github.invite': GithubNode,
  'github.team': GithubNode,
  'github.repositoryAccess': GithubNode,

  // Legacy fallback keys
  githubInvite: GithubNode,
  githubTeam: GithubNode,
  githubRepositoryAccess: GithubNode,
  github: GithubNode,

  // Other provider components
  slack: SlackNode,
  jira: JiraNode,
  notion: NotionNode,
}

// ─── Map iconName / node type -> visual emoji / icon representation ─────────
const iconMap = {
  zap: '⚡',
  github: '🐙',
  users: '👥',
  key: '🔑',
  slack: '💬',
  jira: '📋',
  notion: '📝',
}

export const frontendBindings = Object.freeze({
  /**
   * Get the React component bound to a specific node type.
   * @param {string} type - e.g. 'github.invite'
   * @returns {React.Component}
   */
  getComponent(type) {
    return componentMap[type] || GithubNode
  },

  /**
   * Get the visual icon string/emoji for a given iconName or node type.
   * @param {string} iconNameOrType - e.g. 'zap', 'github', 'github.invite'
   * @returns {string} emoji icon
   */
  getIcon(iconNameOrType) {
    const nodeDef = nodeRegistry.get(iconNameOrType)
    const iconName = nodeDef?.iconName || iconNameOrType
    return iconMap[iconName] || iconMap[iconNameOrType] || '⚡'
  },

  /**
   * Generates the ReactFlow nodeTypes map expected by <ReactFlow nodeTypes={...} />.
   * Dynamically merges all shared registry types with their React components.
   * @returns {object}
   */
  getReactFlowNodeTypes() {
    const types = {}
    // Register all shared metadata types
    for (const typeId of nodeRegistry.getAllTypeIds()) {
      types[typeId] = componentMap[typeId] || GithubNode
    }
    // Retain full mapping including fallbacks
    return {
      ...componentMap,
      ...types,
    }
  },

  /**
   * Generates the nodeLabels map mapping node types to human-readable labels.
   * @returns {object}
   */
  getReactFlowNodeLabels() {
    const labels = {
      trigger: 'New Dev Joins',
      github: 'GitHub',
      slack: 'Add to Slack Channels',
      jira: 'Add to Jira Project',
      notion: 'Send Notion Docs',
    }

    for (const nodeDef of nodeRegistry.getAll()) {
      labels[nodeDef.id] = nodeDef.label
    }

    return labels
  },

  /**
   * Returns a complete binding descriptor for a node type.
   * @param {string} type
   * @returns {object}
   */
  getBinding(type) {
    const definition = nodeRegistry.get(type)
    return {
      type,
      definition: definition || null,
      component: this.getComponent(type),
      icon: this.getIcon(type),
      label: definition?.label || type,
    }
  },
})

export default frontendBindings
