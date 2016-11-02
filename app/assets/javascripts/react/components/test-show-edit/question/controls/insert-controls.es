import StyleButton from "./style-button.es";

import { FIELD_TYPES } from "./../../../../shared/field-types.es";

const InsertControls = (props) => {
  const block  = FIELD_TYPES.filter(f => f.type === 'block');
  const inline = FIELD_TYPES.filter(f => f.type === 'inline');

  return (
    <div className="editor-control-group">
      <span className="group-title">Insert</span>
      {block.map(type =>
        <StyleButton
          key={type.icon}
          icon={type.icon}
          iconTitle={type.label}
          onToggle={props.onToggle}
          value={type.name}
        />
      )}
      &nbsp;&nbsp;|&nbsp;&nbsp;
      {inline.map(type =>
        <StyleButton
          key={type.icon}
          icon={type.icon}
          iconTitle={type.label}
          onToggle={props.onToggle}
          value={type.name}
        />
      )}
    </div>
  );
}

export default InsertControls;
