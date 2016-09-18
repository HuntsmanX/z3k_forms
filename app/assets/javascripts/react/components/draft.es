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

  componentWillReceiveProps(nextProps) {
    this.setState({
      editorState: this.parseValue(nextProps.value)
    });
  }

  onChange(editorState) {
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
    this.props.onChange(
      convertToRaw(this.state.editorState.getCurrentContent())
    );
  }

  toggleBlockType(blockType) {
    this.onChange(
      RichUtils.toggleBlockType(this.state.editorState, blockType)
    );
  }

  toggleInlineStyle(inlineStyle) {
    this.onChange(
      RichUtils.toggleInlineStyle(this.state.editorState, inlineStyle)
    )
  }

  render() {
    const { editorState, focused } = this.state;

    return (
      <div className="draft-root" data-focused={focused}>
        <BlockTypeControls
          editorState={editorState}
          onToggle={this.toggleBlockType.bind(this)}
        />

        <InlineStyleControls
          editorState={editorState}
          onToggle={this.toggleInlineStyle.bind(this)}
        />

        <div className="draft-divider" />

        <div className="draft-editor">
          <Editor
            editorState={editorState}
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

const BLOCK_TYPES = [
  { label: 'H1',    style: 'header-one' },
  { label: 'H2',    style: 'header-two' },
  { label: 'H3',    style: 'header-three' },
  { label: 'H4',    style: 'header-four' },
  // { label: 'Quote', style: 'blockquote' },
  { label: 'UL',    style: 'unordered-list-item' },
  { label: 'OL',    style: 'ordered-list-item' },
  { label: 'Code',  style: 'code-block' }
];

const BlockTypeControls = (props) => {
  const { editorState } = props;
  const selection = editorState.getSelection();
  const blockType = editorState
    .getCurrentContent()
    .getBlockForKey(selection.getStartKey())
    .getType();

  return (
    <div className="draft-controls">
      {BLOCK_TYPES.map(type =>
        <StyleButton
          key={type.label}
          active={type.style === blockType}
          label={type.label}
          onToggle={props.onToggle}
          style={type.style}
        />
      )}
    </div>
  )
}

var INLINE_STYLES = [
  { label: 'Bold',      style: 'BOLD' },
  { label: 'Italic',    style: 'ITALIC' },
  { label: 'Underline', style: 'UNDERLINE' }
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
