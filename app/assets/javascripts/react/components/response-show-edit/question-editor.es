import { observer } from "mobx-react";
import { Editor, DefaultDraftBlockRenderMap, Entity } from "draft-js";
import { Map } from "immutable";

import AtomicBlockWrapper from "../test-show-edit/question/editor/atomic-block-wrapper.es";

import { FIELD_TYPES } from "./../../shared/field-types.es";

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
      const fieldType  = FIELD_TYPES.find(f => entityType === f.name);

      const { question } = this.props;

      if (entityType === 'eol-block') {
        return {
          component: EolBlock,
          editable:  false,
          props: {
            atomicBlockType: 'eol-block'
          }
        };

      } else if (fieldType) {
        const field = question.fields.find(field => field.blockKey === block.getKey());

        return {
          component: fieldType.component,
          editable:  false,
          props: {
            atomicBlockType: entityType,
            field:           field,
            onChange:        this.getOnChangeFunc(entityType, question, field),
            valueKey:        this.getValueKey(entityType, question, field),
            placeholder:     'Answer',
            readOnly:        false
          }
        }
      }
    }
  }

  getOnChangeFunc = (entityType, question, field) => {
    switch(entityType) {
      case 'text_input':
      case 'text_area':
      case 'inline_text_input':
        return (e) => field.change('user_content', e.target.value)
        break;
      case 'dropdown':
      case 'checkboxes':
      case 'radio_buttons':
      case 'inline_dropdown':
        return (e) => field.toggleCorrectOption(e.target.value)
        break;
      case 'sequence':
        return field.moveOption;
        break;
    }
  }

  getValueKey = (entityType, question, field) => {
    switch(entityType) {
      case 'dropdown':
      case 'checkboxes':
      case 'radio_buttons':
      case 'inline_dropdown':
        return 'user_selected';
        break;
      default:
        return 'user_content';
    }
  }

  render() {
    const { question } = this.props;

  return(
    <div className="question-editor">
      <Editor
        blockRendererFn={this.blockRenderer}
        customStyleMap={styleMap}
        blockRenderMap={blockRenderMap}
        editorState={question.editorState}
        readOnly
      />
    </div>
  )
  }
}

class EolBlock extends React.Component {

  render() {
    return <br />;
  }

}
export default QuestionEditor;
