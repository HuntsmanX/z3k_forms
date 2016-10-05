import { observable, action, computed } from "mobx";
import { EditorState, RichUtils, Entity, AtomicBlockUtils, convertToRaw, ContentState } from "draft-js";
import { remove } from "lodash/array";
import uuid from "node-uuid";

import QuestionOption from "./question-option.es";
import GapOption      from "./gap-option.es";

class TestQuestion {

  @observable editorState = EditorState.moveSelectionToEnd(
    EditorState.createWithContent(
      ContentState.createFromText('Untitled question')
    )
  );
  @observable isBeingEdited = false;
  @observable type          = 'short_answer';
  @observable autocheck     = true;
  @observable score         = 1;
  @observable gapActive     = false;
  @observable options       = [new QuestionOption()];
  @observable gaps          = [];
  @observable shortAnswer   = '';
  @observable paragraph     = '';

  uuid = uuid.v4();

  @action change(attr, val) {
    this[attr] = val;
    if (attr = 'editorState') this._checkRemovedGaps();
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

  @computed get readOnly() {
    return !this.isBeingEdited || this.gapActive;
  }

  @action insertGapBlock() {
    const entityKey = Entity.create('gap-block', 'IMMUTABLE');
    const newState  = AtomicBlockUtils.insertAtomicBlock(this.editorState, entityKey, ' ');

    const activeBlockKey = newState.getSelection().getFocusKey();
    const gapBlockKey    = newState.getCurrentContent().getKeyBefore(activeBlockKey);

    this.gaps.push(
      new GapOption({ blockKey: gapBlockKey })
    );

    this.editorState = newState;
  }

  @action insertEolBlock() {
    const entityKey  = Entity.create('eol-block', 'IMMUTABLE');
    this.editorState = AtomicBlockUtils.insertAtomicBlock(this.editorState, entityKey, ' ');
  }

  @action _checkRemovedGaps() {
    remove(this.gaps, gap => {
      return !this.editorState.getCurrentContent().getBlockForKey(gap.blockKey);
    });
  }

  @action addOption() {
    this.options.push(
      new QuestionOption()
    );
  }

  @action deleteOption(index) {
    this.options.splice(index, 1);
  }

  @action moveOption(dragIndex, hoverIndex) {
    const dragOption = this.options[dragIndex];

    this.options.splice(dragIndex, 1);
    this.options.splice(hoverIndex, 0, dragOption);
  }

  @computed get hasCorrectOptions() {
    return this.type === 'single_choice' || this.type === 'multiple_choice';
  }

}

export default TestQuestion;
