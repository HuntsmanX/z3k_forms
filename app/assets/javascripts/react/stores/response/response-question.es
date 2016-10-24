import { observable, action, computed } from "mobx";
import { EditorState, RichUtils, Entity, AtomicBlockUtils, convertToRaw, convertFromRaw, ContentState, Modifier, SelectionState } from "draft-js";
import ResponseField from './response-field.es'

import Editor from "./question-editor.es";
import uuid from "node-uuid";

class ResponseQuestion{
  @observable content     = '';
  @observable id          = null;
  @observable editorState = null;
  @observable fields      = [];
  @observable editor      = null;
  uuid = uuid.v4();

  constructor(params={}){
    this.fromJSON(params)
  }

  fromJSON(params){
    this.id          = params.id;
    this.editorState = this._parseRawContent(params.content);
    this.editor      = new Editor(params.content);
    this.fields      = params.fields.map(field => {
      return new ResponseField(field)
    });
  }

  _parseRawContent(content) {
    return EditorState.moveSelectionToEnd(
        EditorState.createWithContent(
          convertFromRaw(JSON.parse(content))
        )
      );
    }
  }


export default ResponseQuestion;
