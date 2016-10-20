import { observable, action, computed } from "mobx";
import { EditorState, RichUtils, Entity, AtomicBlockUtils, convertToRaw, convertFromRaw, ContentState, Modifier, SelectionState } from "draft-js";
import uuid from "node-uuid";
import humanize from "underscore.string/humanize";

import Field from "./field.es";

class Question {

  @observable id             = null;
  @observable _fields        = [];
  @observable editorState    = null;

  @observable fieldActive    = false;
  @observable isBeingEdited  = false;
  @observable isBeingSaved   = false;
  @observable edited         = false;
  @observable errors         = [];

  uuid = uuid.v4();

  @computed get fields() {
    return this._fields.filter(field => !field._destroy)
  }

  @computed get score() {
    return this.fields
      .map(field => field.score)
      .reduce((prev, curr) => (+curr || 0) + prev, 0);
  }

  @computed get autoScore() {
    return this.fields
      .filter(field => field.autocheck)
      .map(field => field.score)
      .reduce((prev, curr) => (+curr || 0) + prev, 0);
  }

  @computed get manualScore() {
    return this.fields
      .filter(field => !field.autocheck)
      .map(field => field.score)
      .reduce((prev, curr) => (+curr || 0) + prev, 0);
  }

  @computed get persisted() {
    return !!this.id;
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

    this.section_id  = params.section_id;
    this.order_index = params.order_index;

    this.editorState = this._parseRawContent(params.content);
    this._fields = (params.fields || []).map(field => {
      return new Field(field)
    });

    this.isBeingEdited = params.isBeingEdited || this.isBeingEdited;

    this.edited = false;
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

      if (block.getType() === "atomic") {
        const previousBlockKey = value.getCurrentContent().getKeyBefore(blockKey);
        const previousBlock    = value.getCurrentContent().getBlockForKey(previousBlockKey);

        let selection = value.getSelection()
        selection     = selection.set('anchorKey', previousBlockKey);
        selection     = selection.set('anchorOffset', previousBlock.getLength());

        if (block.getText() !== " ") selection = selection.set('focusOffset', 0);

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
    this.focus();

    if (value) this.edited = true;
  }

  @action save() {
    this.isBeingSaved = true;
    this.errors = [];
    this.fields.forEach(field => field.change('errors', []));

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
      data => {
        if (data.status === 422) {
          this.setErrors(data.responseJSON.errors);
        } else {
          alert(`Server error occured: ${data.status}, ${data.statusText}`);
        }
        this.isBeingSaved  = false;
      }
    );
  }

  @action setErrors(errors) {
    this.errors = Object.keys(errors)
      .filter(attr => !/^fields/.test(attr))
      .map(attr => `${humanize(attr)} ${errors[attr].join(', ')}`);

    errors.fields && errors.fields.forEach(fieldErrors => {
      this.fields
        .find(field => field.blockKey === fieldErrors.block_key)
        .setErrors(fieldErrors.errors)
    });
  }

  serialize() {
    const serializeOption = (option, index) => {
      return {
        id:          option.id,
        content:     option.content,
        is_correct:  option.is_correct,
        _destroy:    option._destroy,
        order_index: index
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
        order_index:       this.order_index,
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

     this.change('editorState', newState);
   }

  @action insertEolBlock() {
    const entityKey  = Entity.create('eol-block', 'IMMUTABLE');
    this.change(
      'editorState', AtomicBlockUtils.insertAtomicBlock(this.editorState, entityKey, ' ')
    );
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

  @action assignEditorRef(ref) {
    this.editorRef = ref;
  }

  @action focus() {
    setTimeout(() => {
      this.editorRef && this.editorRef.focus();
    }, 0);
  }

}

export default Question;
