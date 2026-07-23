import { inviteNode } from './github/invite.js'
import { teamNode } from './github/team.js'
import { repositoryAccessNode } from './github/repositoryAccess.js'
import { triggerNode } from './trigger/trigger.js'
import { addToChannelsNode } from './slack/addToChannels.js'

/**
 * Pure Metadata Node Registry.
 *
 * Contains ZERO implementation logic, React components, API calls, or backend executors.
 * Serves as the single declarative source of truth for node definitions.
 */

const registry = new Map([
  [triggerNode.id, triggerNode],
  [inviteNode.id, inviteNode],
  [teamNode.id, teamNode],
  [repositoryAccessNode.id, repositoryAccessNode],
  [addToChannelsNode.id, addToChannelsNode],
])

export const nodeRegistry = Object.freeze({
  /**
   * Get a single node definition by ID.
   * @param {string} id - e.g., 'github.invite'
   * @returns {object|undefined}
   */
  get(id) {
    return registry.get(id)
  },

  /**
   * Get all registered node definitions.
   * @returns {Array<object>}
   */
  getAll() {
    return Array.from(registry.values())
  },

  /**
   * Get an array of all registered node type ID strings.
   * Useful for enum validation (Mongoose schema / express-validator).
   * @returns {Array<string>} - e.g., ['trigger', 'github.invite', ...]
   */
  getAllTypeIds() {
    return Array.from(registry.keys())
  },

  /**
   * Get node definitions grouped by category.
   * Useful for rendering structured sidebars.
   * @returns {Array<{category: string, items: Array<object>}>}
   */
  getCategories() {
    const categoryMap = new Map()

    for (const nodeDef of registry.values()) {
      const category = nodeDef.category || 'General'
      if (!categoryMap.has(category)) {
        categoryMap.set(category, [])
      }
      categoryMap.get(category).push(nodeDef)
    }

    return Array.from(categoryMap.entries()).map(([category, items]) => ({
      category,
      items,
    }))
  },

  /**
   * Get all node definitions belonging to a specific provider.
   * @param {string} provider - e.g., 'github'
   * @returns {Array<object>}
   */
  getByProvider(provider) {
    return Array.from(registry.values()).filter((n) => n.provider === provider)
  },
})

export default nodeRegistry
