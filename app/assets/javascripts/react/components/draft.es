import React, { Component } from "react";
import { Map } from "immutable";
import { observer } from "mobx-react";

import {
  Editor,
  EditorState,
  RichUtils,
  convertToRaw,
  convertFromRaw,
  Entity,
  Modifier,
  CompositeDecorator,
  AtomicBlockUtils
} from "draft-js";

import BlockTypeControls   from "./draft/block-type-controls.es";
import InlineStyleControls from "./draft/inline-style-controls.es";

const findGapEntities = (contentBlock, callback) => {
  contentBlock.findEntityRanges(character => {
    const entityKey = character.getEntity();
    return entityKey !== null && Entity.get(entityKey).getType() === 'GAP';
  }, callback);
}

class Gap extends React.Component {

  render() {
    return (
      <span className="label secondary">{this.props.children}</span>
    );
  }

}

@observer
class Draft extends Component {

  constructor(props) {
    super(props);
    this.state = { editorState: this.parseValue(props.value), readOnly: false };

    this.blockRenderer = (block) => {
      if (block.getType() === 'atomic') {
        return {
          component: GapBlock,
          editable:  false,
          props: {
            onStartEdit: () => {
              this.setState({ readOnly: true });
            },
            onStopEdit: () => {
              this.setState({ readOnly: false });
            }
          }
        };
      }
      return null;
    }
  }

  parseValue(value) {
    const decorator = new CompositeDecorator([
      {
        strategy:  findGapEntities,
        component: Gap,
      },
    ]);

    try {
      const val = typeof value === "string" ? JSON.parse(value) : value;
      return EditorState.createWithContent(convertFromRaw(val), decorator);
    }
    catch (error) {
      console.error('Failed to parse content, using empty state instead');
      return EditorState.createEmpty(decorator);
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

  toggleBlockType(blockType) {
    this.onChange(
      RichUtils.toggleBlockType(this.state.editorState, blockType)
    );
  }

  toggleInlineStyle(inlineStyle) {
    this.onChange(
      RichUtils.toggleInlineStyle(this.state.editorState, inlineStyle)
    );
  }

  insertGap() {
    const { editorState } = this.state;
    const currentContent  = editorState.getCurrentContent();
    const entity          = Entity.create('GAP', 'IMMUTABLE');
    const selection       = editorState.getSelection();

    const withEntity = Modifier.insertText(currentContent, selection, "Gap # 1", null, entity);
    const newState   = EditorState.push(editorState, withEntity, 'insert-text');

    this.setState({ editorState: newState });
  }

  focus() {
    this.refs.editor.focus();
  }

  insertGapBlock() {
    const editorState = this.state.editorState;

    const entityKey = Entity.create(
      'GAPBLOCK',
      'IMMUTABLE'
    );

    const newState = AtomicBlockUtils.insertAtomicBlock(editorState, entityKey, '');
    this.setState({ editorState: newState });
  }

  render() {
    const { editorState, focused } = this.state;
    console.log('read only', this.state.readOnly);
    return (
      <div className="draft-root" data-focused={focused} onClick={this.focus.bind(this)}>
        <BlockTypeControls
          editorState={editorState}
          onToggle={this.toggleBlockType.bind(this)}
        />

        <InlineStyleControls
          editorState={editorState}
          onToggle={this.toggleInlineStyle.bind(this)}
        />

        {this.props.gapsEnabled ? (
          <div className="draft-controls">
            <span className="style-button" onMouseDown={this.insertGap.bind(this)}>Gap</span>
            <span className="style-button" onMouseDown={this.insertGapBlock.bind(this)}>GapBlock</span>
          </div>
        ) : null}

        <div className="draft-divider" />

        <div className="draft-editor">
          <Editor
            blockRendererFn={this.blockRenderer}
            editorState={editorState}
            customStyleMap={styleMap}
            onChange={this.onChange.bind(this)}
            handleKeyCommand={this.handleKeyCommand.bind(this)}
            spellCheck={true}
            onFocus={this.handleFocus.bind(this)}
            onBlur={this.handleBlur.bind(this)}
            placeholder={this.props.placeholder}
            ref='editor'
            readOnly={this.state.readOnly}
          />
        </div>
      </div>
    );
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

Draft.defaultProps = {
  gapsEnabled: false
}

class GapBlock extends React.Component {

  onFocus(event) {
    this.props.blockProps.onStartEdit();
  }

  onBlur(event) {
    this.props.blockProps.onStopEdit();
  }

  render() {
    return (
      <input type="text" onFocus={this.onFocus.bind(this)} onBlur={this.onBlur.bind(this)}/>
    );
  }

}

export default Draft;
