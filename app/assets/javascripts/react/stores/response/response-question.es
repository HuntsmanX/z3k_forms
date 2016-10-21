import { observable, action, computed } from "mobx";
import { EditorState, RichUtils, Entity, AtomicBlockUtils, convertToRaw, convertFromRaw, ContentState, Modifier, SelectionState } from "draft-js";
import uuid from "node-uuid";

import ResponseField from "./response-field.es";

class ResponseQuestion {
  @observable id             = null;
  @observable fields         = [];
  @observable editorState    = null;

  constructor(params = {}) {
    this.fromJSON(params);
  }

  fromJSON(params) {
    if (params.id) this.id = params.id;
    this.section_id        = params.section_id;
    this.editorState       = this._parseRawContent(params.content);

    this.fields = params.fields.map(field => {
      return new ResponseField(field)
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
}

export default ResponseQuestion;
