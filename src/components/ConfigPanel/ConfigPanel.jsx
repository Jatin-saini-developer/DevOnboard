import { useDispatch, useSelector } from "react-redux";
import { setSelectedNode, updateNodeData } from "../../store/WorkFlowSlice";

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
        return (
          <div style={styles.fieldGroup}>
            <label style={styles.label}>Organization Name</label>
            <input
              style={styles.input}
              defaultValue={selectedNode.data.orgName || ""}
              onChange={(e) => handleChange("orgName", e.target.value)}
              placeholder="e.g. my-company"
            />
            <label style={styles.label}>Repositories (comma separated)</label>
            <input
              style={styles.input}
              defaultValue={selectedNode.data.repos || ""}
              onChange={(e) => handleChange("repos", e.target.value)}
              placeholder="e.g. frontend, backend, docs"
            />
            <label style={styles.label}>Role</label>
            <select
              style={styles.input}
              defaultValue={selectedNode.data.role || "member"}
              onChange={(e) => handleChange("role", e.target.value)}
            >
              <option value="member">Member</option>
              <option value="admin">Admin</option>
              <option value="owner">Owner</option>
            </select>
          </div>
        );

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
