import { observable, action, computed } from "mobx";
import { EditorState, RichUtils, Entity, AtomicBlockUtils, convertToRaw, ContentState, Modifier, SelectionState } from "draft-js";
import { remove } from "lodash/array";
import uuid from "node-uuid";

import Field from "./field.es";

class Question {

  @observable editorState = EditorState.moveSelectionToEnd(
    EditorState.createWithContent(
      ContentState.createFromText('Untitled question')
    )
  );
  @observable isBeingEdited  = false;
  @observable fieldActive    = false;
  @observable isBeingSaved   = false;
  @observable fields         = [];

  uuid = uuid.v4();

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
    // console.log(this)
    // this.isBeingSaved = true;
    // const url  = this.id ? `/test/questions/${this.id}` : '/test/questions';
    // const type = this.id ? 'PATCH' : 'POST';
    // var content = JSON.stringify(convertToRaw(this.editorState.getCurrentContent()))
    // $.ajax({
    //   url:  url,
    //   type: type,
    //   data: {
    //     question: {
    //       options:     this.options.toJS(),
    //       section_id:  this.section_id,
    //       type:        this.type,
    //       autocheck:   this.autocheck,
    //       score:       this.score,
    //       paragraph:   this.paragraph,
    //       shortAnswer: this.shortAnswer,
    //       fieldActive:   this.fieldActive,
    //       content:     content
    //     }
    // }
    // })
    this.isBeingEdited = false;
  }

  @computed get readOnly() {
    return !this.isBeingEdited || this.fieldActive;
  }

   @action insertField(type) {
     const entityKey = Entity.create(type, 'IMMUTABLE');
     const newState  = AtomicBlockUtils.insertAtomicBlock(this.editorState, entityKey, ' ');

     const activeBlockKey = newState.getSelection().getFocusKey();
     const fieldBlockKey  = newState.getCurrentContent().getKeyBefore(activeBlockKey);

     this.fields.push(
       new Field({ type: type, blockKey: fieldBlockKey })
     );

     this.editorState = newState;
   }

  @action insertEolBlock() {
    const entityKey  = Entity.create('eol-block', 'IMMUTABLE');
    this.editorState = AtomicBlockUtils.insertAtomicBlock(this.editorState, entityKey, ' ');
  }

  @action _checkRemovedFields() {
    remove(this.fields, field => {
      return !this.editorState.getCurrentContent().getBlockForKey(field.blockKey);
    });
  }

}

export default Question;
