import { observable, action, computed } from "mobx";
import { EditorState, RichUtils, Entity, AtomicBlockUtils, convertToRaw, convertFromRaw, ContentState, Modifier, SelectionState } from "draft-js";
import uuid from "node-uuid";

import ResponseField from './response-field.es'

class ResponseQuestion {

  @observable editorState = null;
  @observable fields      = [];

  uuid = uuid.v4();

  constructor(params = {}) {
    this.fromJSON(params)
  }

  fromJSON(params){
    this.id          = params.id;
    this.section_id  = params.section_id;
    this.editorState = this._parseRawContent(params.content);

    this.fields = params.fields.map(field => {
      return new ResponseField(field)
    });
  }

  _parseRawContent(content) {
    return EditorState.createWithContent(
      convertFromRaw(
        JSON.parse(content)
      )
    );
  }
}


export default ResponseQuestion;
