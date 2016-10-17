import { observer } from "mobx-react";
import { Editor, DefaultDraftBlockRenderMap, Entity } from "draft-js";
import { Map } from 'immutable';

import AtomicBlockWrapper from "./editor/atomic-block-wrapper.es";
import TextInputBlock     from "./editor/text-input-block.es";
import TextAreaBlock      from "./editor/text-area-block.es";
import DropdownBlock      from "./editor/dropdown-block.es";
import CheckboxesBlock    from "./editor/checkboxes-block.es";
import RadioButtonsBlock  from "./editor/radio-buttons-block.es";
import SequenceBlock      from "./editor/sequence-block.es";
import TextEditorBlock    from "./editor/text-editor-block.es";

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

class EolBlock extends React.Component {

  render() {
    return <br />;
  }

}

export default QuestionEditor;
