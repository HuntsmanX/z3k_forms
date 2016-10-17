import { observable, action, computed } from "mobx";
import { EditorState, RichUtils, Entity, AtomicBlockUtils, convertToRaw, convertFromRaw, ContentState, Modifier, SelectionState } from "draft-js";
import { remove } from "lodash/array";
import uuid from "node-uuid";

import Field from "./field.es";

class Question {

  @observable id             = null;
  @observable _fields        = [];
  @observable editorState    = null;

  @observable fieldActive    = false;
  @observable isBeingEdited  = false;
  @observable isBeingSaved   = false;

  uuid = uuid.v4();

  @computed get fields() {
    return this._fields.filter(field => !field._destroy)
  }

  @action change(attr, val) {
    if (attr === 'editorState') {
      this._updateEditorState(val);
      this._checkRemovedFields();
    } else {
      this[attr] = val;
    }
  }

  constructor(params = {}) {
    this.fromJSON(params);
  }

  fromJSON(params) {
    if (params.id) this.id = params.id;

    this.section_id = params.section_id;
    this.editorState = this._parseRawContent(params.content);
    this._fields = (params.fields || []).map(field => {
      return new Field(field)
    });
  }

  _parseRawContent(content) {
    try {
      return EditorState.moveSelectionToEnd(
        EditorState.createWithContent(
          convertFromRaw(JSON.parse(content))
        )
      );
    }
    catch(error) {
      return EditorState.moveSelectionToEnd(
        EditorState.createWithContent(
          ContentState.createFromText('Untitled question')
        )
      );
    }
  }

  _updateEditorState(value) {
    if (value.getLastChangeType() === 'backspace-character') {
      const blockKey = value.getSelection().getFocusKey();
      const block    = value.getCurrentContent().getBlockForKey(blockKey);

      if (block.getType() === "atomic" && block.getText() === " ") {
        const previousBlockKey = value.getCurrentContent().getKeyBefore(blockKey);
        const previousBlock    = value.getCurrentContent().getBlockForKey(previousBlockKey);

        let selection = value.getSelection()
        selection     = selection.set('anchorKey', previousBlockKey);
        selection     = selection.set('anchorOffset', previousBlock.getLength());

        const modifiedContent = Modifier.removeRange(this.editorState.getCurrentContent(), selection, 'backward');
        this.editorState = EditorState.push(this.editorState, modifiedContent, value.getLastChangeType());
      } else {
        this.editorState = value;
      }
    } else {
      this.editorState = value;
    }
  }

  @action handleKeyCommand(command) {
    const newState = RichUtils.handleKeyCommand(this.editorState, command);

    if (newState) {
      this.editorState = newState;
      return true;
    }
    return false;
  }

  @action toggleBlockType(blockType) {
    this.editorState = RichUtils.toggleBlockType(this.editorState, blockType);
  }

  @action toggleInlineStyle(style) {
    this.editorState = RichUtils.toggleInlineStyle(this.editorState, style);
  }

  @action edit(value = true) {
    this.isBeingEdited = value;
  }

  @action save() {
    this.isBeingSaved = true;

    const url  = this.id ? `/test/questions/${this.id}` : '/test/questions';
    const type = this.id ? 'PATCH' : 'POST';

    $.ajax({
      url:         url,
      type:        type,
      dataType:    'json',
      contentType: 'application/json',
      data:        JSON.stringify(this.serialize())
    }).then(
      data => {
        this.fromJSON(data);
        this.isBeingSaved  = false;
        this.isBeingEdited = false;
      },
      data => console.log(data)
    );
  }

  serialize() {
    const serializeOption = (option, index) => {
      return {
        id:         option.id,
        content:    option.content,
        is_correct: option.is_correct,
        _destroy:   option._destroy
      };
    }

    const serializeField = (field, index) => {
      return {
        id:                 field.id,
        block_key:          field.blockKey,
        content:            field.content,
        score:              field.score,
        autocheck:          field.autocheck,
        field_type:         field.type,
        _destroy:           field._destroy,
        options_attributes: field._options.map(serializeOption)
      };
    }

    return {
      question: {
        section_id:        this.section_id,
        content:           JSON.stringify(convertToRaw(this.editorState.getCurrentContent())),
        fields_attributes: this._fields.map(serializeField)
      }
    }
  }

  @computed get readOnly() {
    return !this.isBeingEdited || this.fieldActive;
  }

   @action insertField(type) {
     const entityKey = Entity.create(type, 'IMMUTABLE');
     const newState  = AtomicBlockUtils.insertAtomicBlock(this.editorState, entityKey, ' ');

     const activeBlockKey = newState.getSelection().getFocusKey();
     const fieldBlockKey  = newState.getCurrentContent().getKeyBefore(activeBlockKey);

     this._fields.push(
       new Field({ type: type, blockKey: fieldBlockKey })
     );

     this.editorState = newState;
   }

  @action insertEolBlock() {
    const entityKey  = Entity.create('eol-block', 'IMMUTABLE');
    this.editorState = AtomicBlockUtils.insertAtomicBlock(this.editorState, entityKey, ' ');
  }

  @action _checkRemovedFields() {
    this._fields.forEach(field => {
      const editorBlock = this.editorState.getCurrentContent().getBlockForKey(field.blockKey);
      if (!editorBlock) field.change('_destroy', true);
    });
  }

  @action destroy() {
    if (this.id) {
      this.isBeingSaved = true;

      return $.ajax({
        url:  `/test/questions/${this.id}`,
        type: 'DELETE'
      });
    } else {
      return Promise.resolve();
    }
  }

}

export default Question;
