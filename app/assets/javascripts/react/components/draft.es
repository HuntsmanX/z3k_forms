import React, { Component } from "react";
import { Editor, EditorState, RichUtils, convertToRaw, convertFromRaw } from "draft-js";
import { observer } from "mobx-react";

@observer
class Draft extends Component {

  constructor(props) {
    super(props);
    this.state = { editorState: this.parseValue(props.value) };
  }

  parseValue(value) {
    try {
      const val = typeof value === "string" ? JSON.parse(value) : value;
      return EditorState.createWithContent(convertFromRaw(val));
    }
    catch (error) {
      console.error('Failed to parse content, using empty state instead');
      return EditorState.createEmpty();
    }
  }

  onChange(editorState) {
    this.props.onChange(
      convertToRaw(editorState.getCurrentContent())
    );
    this.setState({ editorState });
  }

  handleKeyCommand(command) {
    const { editorState } = this.state;
    const newState = RichUtils.handleKeyCommand(editorState, command);

    if (newState) {
      this.onChange(newState);
      return true;
    }
    return false;
  }

  handleFocus() {
    this.setState({ focused: true });
  }

  handleBlur() {
    this.setState({ focused: false });
  }

  toggleInlineStyle(inlineStyle) {
    this.onChange(
      RichUtils.toggleInlineStyle(this.state.editorState, inlineStyle)
    );
  }

  render() {
    const { editorState, focused } = this.state;

    return (
      <div className="draft-root" data-focused={focused}>
        <InlineStyleControls
          editorState={editorState}
          onToggle={this.toggleInlineStyle.bind(this)}
        />

        <div className="draft-divider" />

        <div className="draft-editor">
          <Editor
            editorState={editorState}
            customStyleMap={styleMap}
            onChange={this.onChange.bind(this)}
            handleKeyCommand={this.handleKeyCommand.bind(this)}
            spellCheck={true}
            onFocus={this.handleFocus.bind(this)}
            onBlur={this.handleBlur.bind(this)}
            placeholder={this.props.placeholder}
          />
        </div>
      </div>
    );
  }

}

class StyleButton extends Component {

  onToggle(event) {
    event.preventDefault();
    this.props.onToggle(this.props.style);
  }

  render() {
    const { active, label } = this.props;

    let className = 'style-button';
    if (active) className += ' active';

    return (
      <span className={className} onMouseDown={this.onToggle.bind(this)}>
        {label}
      </span>
    )
  }

}

const styleMap = {
  'CODE': {
    fontFamily:      'Consolas, "Liberation Mono", Courier, monospace',
    backgroundColor: '#e6e6e6',
    border:          '1px solid #cacaca',
    padding:         '0.14706rem 0.36765rem 0.07353rem'
  },
};

const INLINE_STYLES = [
  { label: 'Bold',      style: 'BOLD' },
  { label: 'Italic',    style: 'ITALIC' },
  { label: 'Underline', style: 'UNDERLINE' },
  { label: 'Code',      style: 'CODE' }
];

const InlineStyleControls = (props) => {
  const currentStyle = props.editorState.getCurrentInlineStyle();

  return (
    <div className="draft-controls">
      {INLINE_STYLES.map(type =>
        <StyleButton
          key={type.label}
          active={currentStyle.has(type.style)}
          label={type.label}
          onToggle={props.onToggle}
          style={type.style}
        />
      )}
    </div>
  );
};

export default Draft;
