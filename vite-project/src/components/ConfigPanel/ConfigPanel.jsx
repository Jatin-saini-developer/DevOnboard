import { useDispatch, useSelector } from "react-redux";
import { setSelectedNodeId, updateNodeData } from "../../store/WorkFlowSlice";
import { selectSelectedNode } from "../../store/WorkFlowSlice";
import { nodeRegistry } from "../../../../shared/registry/nodeRegistry.js";
import ChannelSelect from "./ChannelSelect";

function ConfigPanel() {
  const dispatch = useDispatch();
  // selectSelectedNode derives the live node from state.nodes — always current
  const selectedNode = useSelector(selectSelectedNode);

  if (!selectedNode) return null;

  const handleClose = () => {
    dispatch(setSelectedNodeId(null));
  };

  const handleChange = (field, value) => {
    const updatedData = { ...selectedNode.data, [field]: value };
    console.log(`[NODE-TRACE] ConfigPanel updated "${field}":`, JSON.stringify({ type: selectedNode.type, id: selectedNode.id, data: updatedData }, null, 2));
    dispatch(
      updateNodeData({
        id: selectedNode.id,
        data: { [field]: value },
      })
    );
  };

  // Retrieve declarative schema definition from shared registry
  const nodeDef = nodeRegistry.get(selectedNode.type);
  const inputs = nodeDef?.inputs || [];

  const renderField = (inputSpec) => {
    const { key, label, type, required, placeholder, default: defaultValue, defaultValue: altDefault, description, options } = inputSpec;
    const value = selectedNode.data[key];
    const fallbackDefault = defaultValue !== undefined ? defaultValue : altDefault;
    const currentValue = value !== undefined ? value : fallbackDefault;

    return (
      <div key={key} style={{ marginBottom: '14px' }}>
        {label && (
          <label style={styles.label}>
            {label} {required && <span style={{ color: 'rgba(251,113,133,0.6)' }}>*</span>}
          </label>
        )}

        {type === 'text' && (
          <input
            style={styles.input}
            value={currentValue ?? ''}
            onChange={(e) => handleChange(key, e.target.value)}
            placeholder={placeholder || ''}
          />
        )}

        {type === 'textarea' && (
          <textarea
            style={{ ...styles.input, height: '70px', paddingTop: '8px', resize: 'vertical' }}
            value={currentValue ?? ''}
            onChange={(e) => handleChange(key, e.target.value)}
            placeholder={placeholder || ''}
          />
        )}

        {type === 'select' && (
          <select
            style={styles.input}
            value={currentValue ?? ''}
            onChange={(e) => handleChange(key, e.target.value)}
          >
            {(options || []).map((opt) => {
              const optVal = typeof opt === 'object' ? opt.value : opt;
              const optLabel = typeof opt === 'object' ? opt.label : opt;
              return (
                <option key={optVal} value={optVal}>
                  {optLabel}
                </option>
              );
            })}
          </select>
        )}

        {type === 'checkbox' && (
          <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', color: 'rgba(255,255,255,0.7)', fontSize: '12px' }}>
            <input
              type="checkbox"
              checked={!!currentValue}
              onChange={(e) => handleChange(key, e.target.checked)}
            />
            {placeholder || label}
          </label>
        )}

        {type === 'tags' && (
          <TagInput
            value={currentValue || []}
            onChange={(newTags) => handleChange(key, newTags)}
            placeholder={placeholder || 'Type and press Enter'}
          />
        )}

        {type === 'channelSelect' && (
          <ChannelSelect
            value={currentValue || []}
            onChange={(ids) => handleChange(key, ids)}
          />
        )}

        {description && (
          <p style={{ color: 'rgba(255,255,255,0.3)', fontSize: '10px', marginTop: '4px', margin: '4px 0 0 0' }}>
            {description}
          </p>
        )}
      </div>
    );
  };

  return (
    <div style={styles.panel}>
      {/* Header */}
      <div style={styles.header}>
        <div>
          <p style={styles.nodeType}>{(nodeDef?.category || selectedNode.type).toUpperCase()}</p>
          <p style={styles.nodeLabel}>{nodeDef?.label || selectedNode.data?.label || selectedNode.type}</p>
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

      {/* Dynamic Schema Form Engine */}
      <div style={styles.body}>
        {inputs.length > 0 ? (
          <div style={styles.fieldGroup}>
            {inputs.map(renderField)}
            {nodeDef?.provider === 'github' && <UsernameInfoNote />}
          </div>
        ) : (
          <div style={styles.fieldGroup}>
            <label style={styles.label}>Label</label>
            <input
              style={styles.input}
              value={selectedNode.data.label || ''}
              onChange={(e) => handleChange('label', e.target.value)}
            />
          </div>
        )}
      </div>
    </div>
  );
}

// ─── Info Note Component ─────────────────────────────────────────────────────
function UsernameInfoNote() {
  return (
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
  );
}

// ─── Tag Input Component (for array inputs like repositories) ────────────────
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
      <input
        style={styles.input}
        onKeyDown={handleKeyDown}
        placeholder={placeholder || 'Type and press Enter'}
      />
    </div>
  );
}

// ─── Inline Styles ──────────────────────────────────────────────────────────
const styles = {
  panel: {
    width: '320px',
    height: '100%',
    background: '#000',
    borderLeft: '1px solid rgba(255,255,255,0.06)',
    display: 'flex',
    flexDirection: 'column',
    fontFamily: 'system-ui, -apple-system, sans-serif',
    boxSizing: 'border-box',
  },
  header: {
    padding: '16px 20px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  nodeType: {
    color: 'rgba(255,255,255,0.3)',
    fontSize: '10px',
    fontWeight: '600',
    letterSpacing: '0.1em',
    margin: '0 0 2px 0',
  },
  nodeLabel: {
    color: '#fff',
    fontSize: '14px',
    fontWeight: '600',
    margin: 0,
  },
  closeBtn: {
    background: 'none',
    border: 'none',
    color: 'rgba(255,255,255,0.3)',
    fontSize: '14px',
    cursor: 'pointer',
    padding: '4px 8px',
    borderRadius: '4px',
    transition: 'color 0.15s ease',
  },
  divider: {
    height: '1px',
    background: 'rgba(255,255,255,0.06)',
    width: '100%',
  },
  body: {
    padding: '20px',
    flex: 1,
    overflowY: 'auto',
  },
  fieldGroup: {
    display: 'flex',
    flexDirection: 'column',
  },
  label: {
    color: 'rgba(255,255,255,0.5)',
    fontSize: '11px',
    fontWeight: '500',
    textTransform: 'uppercase',
    letterSpacing: '0.05em',
    marginBottom: '6px',
    display: 'block',
  },
  input: {
    background: 'rgba(255,255,255,0.03)',
    border: '1px solid rgba(255,255,255,0.08)',
    borderRadius: '7px',
    padding: '9px 12px',
    color: '#fff',
    fontSize: '13px',
    outline: 'none',
    width: '100%',
    boxSizing: 'border-box',
    transition: 'border-color 0.15s ease',
  },
};

export default ConfigPanel;
