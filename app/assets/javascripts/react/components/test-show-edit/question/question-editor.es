import { observer } from "mobx-react";
import { Editor, DefaultDraftBlockRenderMap, Entity } from "draft-js";
import { Map } from "immutable";

import { FIELD_TYPES } from "./../../../shared/field-types.es";
import { styleMap }    from "./../../../shared/draft.es";

import AtomicBlockWrapper from "./editor/atomic-block-wrapper.es";

const blockRenderMap = DefaultDraftBlockRenderMap.merge(Map({
  'atomic': {
    element: 'div',
    wrapper: <AtomicBlockWrapper />
  }
}));

@observer
class QuestionEditor extends React.Component {

  focus() {
    this.refs.editor.focus();
  }

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
            onFocus:         question.change.bind(null, 'fieldActive', true),
            onBlur:          question.change.bind(null, 'fieldActive', false),
            onChange:        this.getOnChangeFunc(entityType, question, field),
            valueKey:        this.getValueKey(entityType, question, field),
            placeholder:     'Correct Answer',
            readOnly:        true
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
        return (e) => {
          if (question.isBeingEdited) field.change('content', e.target.value);
        };
        break;
      case 'dropdown':
      case 'checkboxes':
      case 'radio_buttons':
      case 'inline_dropdown':
        return (e) => {
          if (question.isBeingEdited) field.toggleCorrectOption(e.target.value);
        };
        break;
      case 'sequence':
        return (dragId, hoverId) => {
          if (question.isBeingEdited) field.moveOption(dragId, hoverId);
        };
        break;
    }
  }

  getValueKey = (entityType, question, field) => {
    switch(entityType) {
      case 'dropdown':
      case 'checkboxes':
      case 'radio_buttons':
      case 'inline_dropdown':
        return 'is_correct';
        break;
      default:
        return 'content';
    }
  }

  render() {
    const { question } = this.props;
    const { editor }   = question;

    return (
      <div className="question-editor">
        <Editor
          blockRendererFn={this.blockRenderer}
          blockRenderMap={blockRenderMap}
          customStyleMap={styleMap}
          editorState={editor.state}
          onChange={editor.update}
          handleKeyCommand={editor.handleKeyCommand}
          readOnly={question.readOnly}
          handleReturn={editor.handleReturn}
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
