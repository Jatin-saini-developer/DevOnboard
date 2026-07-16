import { useDispatch, useSelector } from "react-redux";
import { setSelectedNode, updateNodeData } from "../../store/WorkFlowSlice";

// ─── GitHub Action Registry ──────────────────────────────────────────────────
// Source of truth for which fields each GitHub action needs.
// The executor's SUPPORTED_ACTIONS mirrors this structure on the backend.
const GITHUB_ACTIONS = {
  invite_to_org: {
    label: 'Invite to Organisation',
    description: 'Send an org invitation to the new developer',
    fields: [
      { key: 'organization', label: 'Organisation Name', type: 'text', placeholder: 'e.g. my-company', required: true },
      { key: 'role', label: 'Role', type: 'select', options: [
        { value: 'member', label: 'Member' },
        { value: 'admin', label: 'Admin' },
      ], default: 'member' },
    ],
  },
  add_to_team: {
    label: 'Add to Team',
    description: 'Add the developer to a GitHub team',
    fields: [
      { key: 'organization', label: 'Organisation Name', type: 'text', placeholder: 'e.g. my-company', required: true },
      { key: 'team', label: 'Team Slug', type: 'text', placeholder: 'e.g. engineering', required: true },
      { key: 'role', label: 'Role', type: 'select', options: [
        { value: 'member', label: 'Member' },
        { value: 'maintainer', label: 'Maintainer' },
      ], default: 'member' },
    ],
  },
  grant_repo_access: {
    label: 'Grant Repository Access',
    description: 'Grant access to one or more repositories',
    fields: [
      { key: 'organization', label: 'Organisation Name', type: 'text', placeholder: 'e.g. my-company', required: true },
      { key: 'repositories', label: 'Repositories', type: 'tags', placeholder: 'Type repo name + Enter', required: true },
      { key: 'role', label: 'Permission', type: 'select', options: [
        { value: 'pull', label: 'Pull (read only)' },
        { value: 'push', label: 'Push (read/write)' },
        { value: 'admin', label: 'Admin' },
        { value: 'maintain', label: 'Maintain' },
        { value: 'triage', label: 'Triage' },
      ], default: 'push' },
    ],
  },
};

function ConfigPanel() {
  const dispatch = useDispatch();
  const selectedNode = useSelector((state) => state.workflow.selectedNode);

  if (!selectedNode) return null;

  const handleClose = () => {
    dispatch(setSelectedNode(null));
  };

  const handleChange = (field, value) => {
    dispatch(
      updateNodeData({
        id: selectedNode.id,
        data: { [field]: value },
      }),
    );
  };

  const renderFields = () => {
    switch (selectedNode.type) {
      case "trigger":
        return (
          <div style={styles.fieldGroup}>
            <label style={styles.label}>Trigger Name</label>
            <input
              style={styles.input}
              defaultValue={selectedNode.data.label}
              onChange={(e) => handleChange("label", e.target.value)}
              placeholder="e.g. New Dev Joins"
            />
            <label style={styles.label}>Description</label>
            <input
              style={styles.input}
              defaultValue={selectedNode.data.description || ""}
              onChange={(e) => handleChange("description", e.target.value)}
              placeholder="What triggers this workflow?"
            />
          </div>
        );

      case "github":
        return <GitHubFields node={selectedNode} onChange={handleChange} />;

      case "slack":
        return (
          <div style={styles.fieldGroup}>
            <label style={styles.label}>Workspace Name</label>
            <input
              style={styles.input}
              defaultValue={selectedNode.data.workspace || ""}
              onChange={(e) => handleChange("workspace", e.target.value)}
              placeholder="e.g. my-company"
            />
            <label style={styles.label}>Channels (comma separated)</label>
            <input
              style={styles.input}
              defaultValue={selectedNode.data.channels || ""}
              onChange={(e) => handleChange("channels", e.target.value)}
              placeholder="e.g. general, engineering, random"
            />
          </div>
        );

      case "jira":
        return (
          <div style={styles.fieldGroup}>
            <label style={styles.label}>Project Key</label>
            <input
              style={styles.input}
              defaultValue={selectedNode.data.projectKey || ""}
              onChange={(e) => handleChange("projectKey", e.target.value)}
              placeholder="e.g. ENG"
            />
            <label style={styles.label}>Team Name</label>
            <input
              style={styles.input}
              defaultValue={selectedNode.data.team || ""}
              onChange={(e) => handleChange("team", e.target.value)}
              placeholder="e.g. Engineering"
            />
            <label style={styles.label}>Role</label>
            <select
              style={styles.input}
              defaultValue={selectedNode.data.role || "developer"}
              onChange={(e) => handleChange("role", e.target.value)}
            >
              <option value="developer">Developer</option>
              <option value="viewer">Viewer</option>
              <option value="admin">Admin</option>
            </select>
          </div>
        );

      case "notion":
        return (
          <div style={styles.fieldGroup}>
            <label style={styles.label}>Workspace Name</label>
            <input
              style={styles.input}
              defaultValue={selectedNode.data.workspace || ""}
              onChange={(e) => handleChange("workspace", e.target.value)}
              placeholder="e.g. my-company"
            />
            <label style={styles.label}>Pages to Share (comma separated)</label>
            <input
              style={styles.input}
              defaultValue={selectedNode.data.pages || ""}
              onChange={(e) => handleChange("pages", e.target.value)}
              placeholder="e.g. Onboarding Guide, Dev Setup, Team Norms"
            />
          </div>
        );

      default:
        return (
          <p style={{ color: "rgba(255,255,255,0.3)", fontSize: "13px" }}>
            No configuration available for this node.
          </p>
        );
    }
  };

  return (
    <div style={styles.panel}>
      {/* Header */}
      <div style={styles.header}>
        <div>
          <p style={styles.nodeType}>{selectedNode.type.toUpperCase()}</p>
          <p style={styles.nodeLabel}>{selectedNode.data.label}</p>
        </div>
        <button
          onClick={handleClose}
          style={styles.closeBtn}
          onMouseEnter={(e) => { e.target.style.color = '#fff' }}
          onMouseLeave={(e) => { e.target.style.color = 'rgba(255,255,255,0.3)' }}
        >
          ✕
        </button>
      </div>

      {/* Divider */}
      <div style={styles.divider} />

      {/* Fields */}
      <div style={styles.body}>{renderFields()}</div>
    </div>
  );
}

// ─── GitHub Action-Driven Fields ─────────────────────────────────────────────
function GitHubFields({ node, onChange }) {
  const currentAction = node.data.action || 'invite_to_org';
  const actionSpec = GITHUB_ACTIONS[currentAction];

  return (
    <div style={styles.fieldGroup}>
      {/* Action selector — always first */}
      <label style={styles.label}>Action</label>
      <select
        style={styles.input}
        value={currentAction}
        onChange={(e) => onChange("action", e.target.value)}
      >
        {Object.entries(GITHUB_ACTIONS).map(([key, spec]) => (
          <option key={key} value={key}>{spec.label}</option>
        ))}
      </select>

      {/* Action description */}
      {actionSpec && (
        <p style={{
          color: 'rgba(255,255,255,0.25)',
          fontSize: '11px',
          margin: '2px 0 8px',
          lineHeight: '1.4',
        }}>
          {actionSpec.description}
        </p>
      )}

      {/* Dynamic fields based on selected action */}
      {actionSpec && actionSpec.fields.map((field) => (
        <div key={field.key} style={{ marginTop: '4px' }}>
          <label style={styles.label}>
            {field.label}
            {field.required && <span style={{ color: 'rgba(251,113,133,0.6)', marginLeft: '3px' }}>*</span>}
          </label>

          {field.type === 'text' && (
            <input
              style={styles.input}
              value={node.data[field.key] || ''}
              onChange={(e) => onChange(field.key, e.target.value)}
              placeholder={field.placeholder || ''}
            />
          )}

          {field.type === 'select' && (
            <select
              style={styles.input}
              value={node.data[field.key] || field.default || ''}
              onChange={(e) => onChange(field.key, e.target.value)}
            >
              {field.options.map((opt) => (
                <option key={opt.value} value={opt.value}>{opt.label}</option>
              ))}
            </select>
          )}

          {field.type === 'tags' && (
            <TagInput
              value={node.data[field.key] || []}
              onChange={(newTags) => onChange(field.key, newTags)}
              placeholder={field.placeholder || ''}
            />
          )}
        </div>
      ))}

      {/* Username note */}
      <div style={{
        marginTop: '16px',
        padding: '10px 12px',
        background: 'rgba(255,255,255,0.02)',
        border: '1px solid rgba(255,255,255,0.04)',
        borderRadius: '8px',
      }}>
        <p style={{
          color: 'rgba(255,255,255,0.3)',
          fontSize: '11px',
          margin: 0,
          lineHeight: '1.5',
        }}>
          💡 The target <strong style={{ color: 'rgba(255,255,255,0.5)' }}>username</strong> is
          automatically populated from the trigger data at execution time.
        </p>
      </div>
    </div>
  );
}

// ─── Tag Input Component (for repositories) ─────────────────────────────────
function TagInput({ value, onChange, placeholder }) {
  const tags = Array.isArray(value) ? value : [];

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault();
      const newTag = e.target.value.trim();
      if (newTag && !tags.includes(newTag)) {
        onChange([...tags, newTag]);
        e.target.value = '';
      }
    }
    if (e.key === 'Backspace' && e.target.value === '' && tags.length > 0) {
      onChange(tags.slice(0, -1));
    }
  };

  const removeTag = (tagToRemove) => {
    onChange(tags.filter((t) => t !== tagToRemove));
  };

  return (
    <div>
      {/* Tags display */}
      {tags.length > 0 && (
        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '4px',
          marginBottom: '6px',
        }}>
          {tags.map((tag) => (
            <span
              key={tag}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '4px',
                background: 'rgba(255,255,255,0.06)',
                border: '1px solid rgba(255,255,255,0.08)',
                borderRadius: '5px',
                padding: '3px 8px',
                fontSize: '12px',
                color: 'rgba(255,255,255,0.7)',
              }}
            >
              {tag}
              <button
                onClick={() => removeTag(tag)}
                style={{
                  background: 'none',
                  border: 'none',
                  color: 'rgba(255,255,255,0.3)',
                  cursor: 'pointer',
                  padding: '0 2px',
                  fontSize: '13px',
                  lineHeight: 1,
                }}
                onMouseEnter={(e) => { e.target.style.color = '#fb7185'; }}
                onMouseLeave={(e) => { e.target.style.color = 'rgba(255,255,255,0.3)'; }}
              >
                ×
              </button>
            </span>
          ))}
        </div>
      )}

      {/* Input field */}
      <input
        style={styles.input}
        placeholder={placeholder}
        onKeyDown={handleKeyDown}
      />
    </div>
  );
}

const styles = {
  panel: {
    width: "280px",
    height: "100%",
    background: "#000",
    borderLeft: "1px solid rgba(255,255,255,0.06)",
    fontFamily: "system-ui, -apple-system, sans-serif",
    display: "flex",
    flexDirection: "column",
    position: "absolute",
    right: 0,
    top: 0,
    zIndex: 10,
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "14px 16px",
  },
  nodeType: {
    color: "rgba(255,255,255,0.25)",
    fontSize: "10px",
    fontWeight: "500",
    letterSpacing: "0.12em",
    margin: "0 0 4px",
  },
  nodeLabel: {
    color: "#fff",
    fontSize: "14px",
    fontWeight: "600",
    margin: 0,
  },
  closeBtn: {
    background: "transparent",
    border: "none",
    color: "rgba(255,255,255,0.3)",
    fontSize: "14px",
    cursor: "pointer",
    padding: "4px",
    transition: "color 0.15s ease",
  },
  divider: {
    height: "1px",
    background: "rgba(255,255,255,0.06)",
    margin: "0 16px",
  },
  body: {
    padding: "16px",
    overflowY: "auto",
    flex: 1,
  },
  fieldGroup: {
    display: "flex",
    flexDirection: "column",
    gap: "6px",
  },
  label: {
    color: "rgba(255,255,255,0.35)",
    fontSize: "11px",
    fontWeight: "500",
    textTransform: "uppercase",
    letterSpacing: "0.08em",
    marginTop: "10px",
  },
  input: {
    background: "rgba(255,255,255,0.03)",
    border: "1px solid rgba(255,255,255,0.06)",
    borderRadius: "7px",
    color: "#fff",
    padding: "8px 10px",
    fontSize: "13px",
    outline: "none",
    width: "100%",
    boxSizing: "border-box",
    fontFamily: "inherit",
    transition: "border-color 0.15s ease",
  },
};

export default ConfigPanel;
