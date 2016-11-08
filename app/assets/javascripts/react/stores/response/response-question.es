import { observable, action, computed } from "mobx";
import { EditorState, RichUtils, Entity, AtomicBlockUtils, convertToRaw, convertFromRaw, ContentState, Modifier, SelectionState } from "draft-js";
import uuid from "node-uuid";

import ResponseField from './response-field.es'

class ResponseQuestion {

  @observable editorState = null;
  @observable fields      = [];
  @observable isBeingEdited = false;
  @observable isBeingSaved  = false;

  uuid = uuid.v4();

  constructor(params = {}) {
    this.fromJSON(params)
  }

  @computed get score() {
    return this.fields
      .map(field => field.score)
      .reduce((prev, curr) => (+curr || 0) + prev, 0);
  }

  @computed get user_score() {
    return this.fields
      .map(field => field.user_score)
      .reduce((prev, curr) => (+curr || 0) + prev, 0);
  }

  @computed get autocheck(){
    return !this.fields
      .map(field => field.autocheck)
      .includes(false);
  }

  @computed get checked(){
    return !this.fields
      .map(field => field.checked)
      .includes(false);
  }

  fromJSON(params){
    this.id            = params.id;
    this.section_id    = params.section_id;
    this.editorState   = this._parseRawContent(params.content);
    this.isBeingEdited = params.isBeingEdited || this.isBeingEdited;

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

  @action edit = (value = true) => {
    this.isBeingEdited = value;
    this.focus();

    if (value) this.edited = true;
  }

  @action focus = () => {
    setTimeout(() => {
      this.editorRef && this.editorRef.focus();
    }, 0);
  }

  @action save = () => {
    this.isBeingSaved = true;
    this.fields.forEach(field => field.change('errors', []));

    const url  = this.id ? `/response/questions/${this.id}` : '/response/questions';
    const type =  'PATCH';

    $.ajax({
      url:         url,
      type:        type,
      dataType:    'json',
      contentType: 'application/json',
      data:        JSON.stringify(this.serialize())
    }).then(
      data => {
        this._fromJSON(data);
        this.isBeingSaved  = false;
        this.isBeingEdited = false;
        this.edited        = false;
      },
      data => {
        if (data.status === 422) {
          this._setErrors(data.responseJSON.errors);
        } else {
          alert(`Server error occured: ${data.status}, ${data.statusText}`);
        }
        this.isBeingSaved = false;
      }
    );
  }

  @action serialize = () => {
    return {
      question: {
        id:                this.id,
        fields_attributes: this.fields.map(this.serializeField)
      }
    }
  }

  @action serializeField = (field, index) => {
    return {
      id:                 field.id,
      user_score:         field.user_score,
    };
  }
}


export default ResponseQuestion;
