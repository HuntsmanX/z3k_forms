import { observer } from "mobx-react";
import { Editor, DefaultDraftBlockRenderMap, Entity } from "draft-js";
import { Map } from "immutable";

import AtomicBlockWrapper from "../test-show-edit/question/editor/atomic-block-wrapper.es";

import TextInputBlock     from "./question-editor/text-input-block.es";
import CheckboxesBlock    from "./question-editor/checkboxes-block.es";
import RadioButtonsBlock  from "./question-editor/radio-buttons-block.es";
import DropdownBlock      from "./question-editor/dropdown-block.es";
import TextAreaBlock      from "./question-editor/text-area-block.es";


import SequenceBlock      from "../test-show-edit/question/editor/sequence-block.es";
import TextEditorBlock    from "../test-show-edit/question/editor/text-editor-block.es";

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

const blockRenderMap = DefaultDraftBlockRenderMap.merge(Map({
  'atomic': {
    element: 'div',
    wrapper: <AtomicBlockWrapper />
  }
}));

@observer
class QuestionEditor extends React.Component {

  blockRenderer = (block) => {
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
          }
        }
      }
    }
  }

  render() {
    const { question } = this.props;
    const { editor }   = question;

  return(
    <div className="draft-editor">
      <Editor
        blockRendererFn={this.blockRenderer}
        customStyleMap={styleMap}
        editorState={editor.state}
        readOnly
        ref="editor"
      />
    </div>
  )
  }
}
export default QuestionEditor;
