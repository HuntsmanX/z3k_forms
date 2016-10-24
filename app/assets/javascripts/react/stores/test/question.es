import { observable, action, computed } from "mobx";
import uuid from "node-uuid";
import humanize from "underscore.string/humanize";

import Field  from "./field.es";
import Editor from "./question-editor.es";

class Question {

  @observable id            = null;
  @observable _fields       = [];
  @observable editor        = null;

  @observable fieldActive   = false;
  @observable isBeingEdited = false;
  @observable isBeingSaved  = false;
  @observable edited        = false;
  @observable errors        = [];

  uuid = uuid.v4();

  constructor(params = {}) {
    this._fromJSON(params);
  }

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

  @computed get readOnly() {
    return !this.isBeingEdited || this.fieldActive;
  }

  @action change = (attr, val) => {
    this[attr] = val;
  }

  @action edit = (value = true) => {
    this.isBeingEdited = value;
    this.focus();

    if (value) this.edited = true;
  }

  @action save = () => {
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
        this._fromJSON(data);
        this.isBeingSaved  = false;
        this.isBeingEdited = false;
      },
      data => {
        if (data.status === 422) {
          this._setErrors(data.responseJSON.errors);
        } else {
          alert(`Server error occured: ${data.status}, ${data.statusText}`);
        }
        this.isBeingSaved  = false;
      }
    );
  }

  @action serialize = () => {
    return {
      question: {
        section_id:        this.section_id,
        content:           this.editor.serialize(),
        order_index:       this.order_index,
        fields_attributes: this._fields.map(this.serializeField)
      }
    }
  }

  @action serializeField = (field, index) => {
    return {
      id:                 field.id,
      block_key:          field.blockKey,
      content:            field.content,
      score:              field.score,
      autocheck:          field.autocheck,
      field_type:         field.type,
      _destroy:           field._destroy,
      options_attributes: field._options.map(this.serializeOption)
    };
  }

  @action serializeOption = (option, index) => {
    return {
      id:          option.id,
      content:     option.content,
      is_correct:  option.is_correct,
      _destroy:    option._destroy,
      order_index: index
    };
  }

  @action insertField = (type) => {
    const fieldBlockKey = this.editor.insertField(type);

    this._fields.push(
      new Field({ type: type, blockKey: fieldBlockKey })
    );
  }

  @action destroy = () => {
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

  @action assignEditorRef = (ref) => {
    this.editorRef = ref;
  }

  @action focus = () => {
    setTimeout(() => {
      this.editorRef && this.editorRef.focus();
    }, 0);
  }

  @action _fromJSON = (params) => {
    if (params.id) this.id = params.id;

    this.section_id  = params.section_id;
    this.order_index = params.order_index;

    this.editor = new Editor(params.content, this._checkRemovedFields);
    this._fields = (params.fields || []).map(field => {
      return new Field(field)
    });

    this.isBeingEdited = params.isBeingEdited || this.isBeingEdited;
    this.edited        = params.edited        || this.edited;
  }

  @action _setErrors = (errors) => {
    this.errors = Object.keys(errors)
      .filter(attr => !/^fields/.test(attr))
      .map(attr => `${humanize(attr)} ${errors[attr].join(', ')}`);

    errors.fields && errors.fields.forEach(fieldErrors => {
      this.fields
        .find(field => field.blockKey === fieldErrors.block_key)
        .setErrors(fieldErrors.errors)
    });
  }

  @action _checkRemovedFields = () => {
    this._fields.forEach(field => {
      if (!this.editor.isBlockPresent(field.blockKey)) field.change('_destroy', true);
    });
  }

}

export default Question;
