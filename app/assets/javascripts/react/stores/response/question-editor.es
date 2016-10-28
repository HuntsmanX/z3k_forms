import { observable, action, computed } from "mobx";
import { EditorState, RichUtils, Entity, AtomicBlockUtils, convertToRaw, convertFromRaw, ContentState, Modifier, SelectionState } from "draft-js";

class QuestionEditor {

  @observable state = null;

  constructor(content) {
    this.state    = this._parseRawContent(content);
  }

  serialize = () => {
    return JSON.stringify(
      convertToRaw(this.state.getCurrentContent())
    );
  }

  isBlockPresent(blockKey) {
    return !!this.state.getCurrentContent().getBlockForKey(blockKey);
  }

  _parseRawContent = (content) => {
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
}

export default QuestionEditor;
