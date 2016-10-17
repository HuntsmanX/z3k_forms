import { observer } from "mobx-react";
import { Editor, DefaultDraftBlockRenderMap, Entity } from "draft-js";
import { Map } from 'immutable';

const styleMap = {
  'CODE': {
    color:      '#0a0a0a',
    fontFamily: 'Consolas, "Liberation Mono", Courier, monospace',
    fontWeight: 'normal',
    background: '#e6e6e6',
    border:     '1px solid #cacaca',
    padding:    '0.14706rem 0.36765rem 0.07353rem'
  }
};

@observer
class QuestionEditor extends React.Component {

  focus() {
    this.refs.editor.focus();
  }

  blockRenderer(block) {
    if (block.getType() === 'atomic') {
      const entityType = Entity.get(block.getEntityAt(0)).getType();

      const blockTypes = {
        'text_input':    TextInputBlock,
        'text_area':     TextAreaBlock,
        'dropdown':      DropdownBlock,
        'checkboxes':    CheckboxesBlock,
        'radio_buttons': RadioButtonsBlock,
        'sequence':      SequenceBlock,
        'text_editor':   TextEditorBlock
      }

      if (entityType === 'eol-block') {
        return {
          component: EolBlock,
          editable:  false,
          props: {
            atomicBlockType: 'eol-block'
          }
        };

      } else if (Object.keys(blockTypes).indexOf(entityType) + 1) {
        const field = this.props.question.fields.find(field => {
          return field.blockKey === block.getKey();
        });

        return {
          component: blockTypes[entityType],
          editable:  false,
          props: {
            atomicBlockType: entityType,
            field:           field,
            question:        this.props.question,
            onStartEdit:     () => {
              this.props.question.change('fieldActive', true);
            },
            onStopEdit:      () => {
              this.props.question.change('fieldActive', false);
            }
          }
        }
      }
    }
  }

  onChange(value) {
    this.props.question.change('editorState', value);
  }

  handleKeyCommand(command) {
    this.props.question.handleKeyCommand(command);
  }

  handleReturn(event) {
    const { editorState } = this.props.question;
    const blockKey  = editorState.getSelection().getFocusKey();
    const blockType = editorState.getCurrentContent().getBlockForKey(blockKey).getType();

    if (['code-block', 'unordered-list-item', 'ordered-list-item'].indexOf(blockType) + 1) {
      return 'not-handled';
    } else {
      this.props.question.insertEolBlock();
      return 'handled';
    }
  }

  render() {
    const { question } = this.props;

    const blockRenderMap = DefaultDraftBlockRenderMap.merge(Map({
      'atomic': {
        element: 'div',
        wrapper: <AtomicBlockWrapper />
      }
    }));

    return (
      <div className="draft-editor">
        <Editor
          blockRendererFn={this.blockRenderer.bind(this)}
          blockRenderMap={blockRenderMap}
          customStyleMap={styleMap}
          editorState={question.editorState}
          onChange={this.onChange.bind(this)}
          handleKeyCommand={this.handleKeyCommand.bind(this)}
          readOnly={question.readOnly}
          handleReturn={this.handleReturn.bind(this)}
          ref="editor"
        />
      </div>
    );
  }

}

class AtomicBlockWrapper extends React.Component {

  render() {
    const type = this.props.children[0].props.children.props.blockProps.atomicBlockType;

    if (type === 'eol-block') {
      return <br data-offset-key={this.props['data-offset-key']} />;
    } else if (['checkboxes', 'radio_buttons', 'sequence', 'text_editor'].indexOf(type) + 1) {
      return (
        <div style={{ display: 'block' }}>
          {this.props.children[0]}
        </div>
      );
    }
    return this.props.children[0];
  }

}

@observer
class TextInputBlock extends React.Component {

  onFocus(event) {
    this.props.blockProps.onStartEdit();
  }

  onBlur(event) {
    this.props.blockProps.onStopEdit();
  }

  onChange(event) {
    if (this.props.blockProps.question.isBeingEdited) {
      this.props.blockProps.field.change(
        'content', event.target.value
      );
    }
  }

  render() {
    const { content } = this.props.blockProps.field;
    return (
      <input
        type="text"
        value={content}
        onChange={this.onChange.bind(this)}
        onFocus={this.onFocus.bind(this)}
        onBlur={this.onBlur.bind(this)}
        placeholder="Correct answer"
      />
    );
  }

}

@observer
class TextAreaBlock extends React.Component {

  onFocus(event) {
    this.props.blockProps.onStartEdit();
  }

  onBlur(event) {
    this.props.blockProps.onStopEdit();
  }

  onChange(event) {
    if (this.props.blockProps.question.isBeingEdited) {
      this.props.blockProps.field.change(
        'content', event.target.value
      );
    }
  }

  render() {
    const { content } = this.props.blockProps.field;
    return (
      <textarea
        value={content}
        onChange={this.onChange.bind(this)}
        onFocus={this.onFocus.bind(this)}
        onBlur={this.onBlur.bind(this)}
        placeholder="Correct answer"
      />
    );
  }

}

@observer
class DropdownBlock extends React.Component {

  onFocus(event) {
    this.props.blockProps.onStartEdit();
  }

  onBlur(event) {
    this.props.blockProps.onStopEdit();
  }

  onChange(event) {
    if (this.props.blockProps.question.isBeingEdited) {
      const { field } = this.props.blockProps;
      field.options.forEach(option => option.change('is_correct', false));
      const selected = field.options.find(option => option.content === event.target.value);
      selected.change('is_correct', true);
    }
  }

  render() {
    const { field } = this.props.blockProps;
    const correctOption = field.options.find(option => option.is_correct);
    const value = correctOption ? correctOption.content : "";
    return (
      <select
        value={value}
        onChange={this.onChange.bind(this)}
        onFocus={this.onFocus.bind(this)}
        onBlur={this.onBlur.bind(this)}
        placeholder="Correct answer"
      >
        {field.options.map(option => {
          return <option key={option.uuid} value={option.content}>{option.content}</option>;
        })}
      </select>
    );
  }

}

@observer
class CheckboxesBlock extends React.Component {

  onChange(optionIndex, event) {
    if (this.props.blockProps.question.isBeingEdited) {
      const option = this.props.blockProps.field.options[optionIndex];
      option.change(
        'is_correct', !option.is_correct
      );
    }
  }

  render() {
    const { field } = this.props.blockProps;

    return (
      <div>
        {field.options.map((option, index) => {
          return (
            <label key={option.uuid}>
              <input type="checkbox" checked={option.is_correct} onChange={this.onChange.bind(this, index)}/>
              {option.content}
            </label>
          );
        })}
      </div>
    );
  }

}

@observer
class RadioButtonsBlock extends React.Component {

  onChange(optionIndex, event) {
    if (this.props.blockProps.question.isBeingEdited) {
      this.props.blockProps.field.options.forEach(option => {
        option.change('is_correct', false);
      });
      const option = this.props.blockProps.field.options[optionIndex];
      option.change('is_correct', true);
    }
  }

  render() {
    const { field } = this.props.blockProps;

    return (
      <div>
        {field.options.map((option, index) => {
          return (
            <label key={option.uuid}>
              <input type="radio" name={field.uuid} checked={option.is_correct} onChange={this.onChange.bind(this, index)}/>
              {option.content}
            </label>
          );
        })}
      </div>
    );
  }

}

@observer
class SequenceBlock extends React.Component {

  render() {
    const { field } = this.props.blockProps;

    return (
      <div>
        {field.options.map((option, index) => {
          return (
            <label key={option.uuid} className="sequence-option">
              <i className="material-icons action">dehaze</i>
              {option.content}
            </label>
          );
        })}
      </div>
    );
  }
}

@observer
class TextEditorBlock extends React.Component {

  render() {
    const { content } = this.props.blockProps.field;

    return (
      <textarea
        placeholder="Text Editor"
        disabled
      />
    );
  }

}

class EolBlock extends React.Component {

  render() {
    return <br />;
  }

}

export default QuestionEditor;
