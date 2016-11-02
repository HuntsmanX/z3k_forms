import { observable, action } from "mobx";
import { EditorState, RichUtils, convertToRaw } from "draft-js";

import { parseRawDraftContent } from "./../../shared/draft.es";

class FieldEditor {

  @observable state = null;

  constructor(content) {
    this.state = this._parseRawContent(content);
  }

  @action change = (value) => {
    this.state = value;
  }

  @action handleKeyCommand = (command) => {
    const newState = RichUtils.handleKeyCommand(this.state, command);

    if (newState) {
      this.change(newState);
      return true;
    }
    return false;
  }

  @action toggleBlockType = (blockType) => {
    this.change(
      RichUtils.toggleBlockType(this.state, blockType)
    );
  }

  @action toggleInlineStyle = (style) => {
    this.change(
      RichUtils.toggleInlineStyle(this.state, style)
    );
  }

  serialize = () => {
    return JSON.stringify(
      convertToRaw(this.state.getCurrentContent())
    );
  }

  _parseRawContent = (content) => {
    const state = parseRawDraftContent(content);

    if (state) return state;

    return EditorState.createEmpty();
  }

}

export default FieldEditor;
