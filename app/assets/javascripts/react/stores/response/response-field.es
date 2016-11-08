import { observable, action, computed } from "mobx";
import { findIndex } from "lodash/array";
import uuid from "node-uuid";

import Editor from "./response-field-editor.es";
import ResponseOption from "./response-option.es";
import { FIELD_TYPES } from "./../../shared/field-types.es";

class ResponseField {

  @observable user_content   = '';
  @observable options        = [];
  @observable editor         = null;
  @observable checked        = false;
  score                      = null;
  @observable user_score     = 0;
  autocheck                  = false;
  content                    = '';

  uuid = uuid.v4();

  constructor(params = {}) {
    this.fromJSON(params);
  }

  fromJSON(params) {
    this.id                 = params.id;
    this.field_type         = params.field_type;
    this.blockKey           = params.blockKey     || params.block_key;
    this.user_content       = params.user_content || this.user_content;
    this.editor             = new Editor(this.user_content);
    this.checked            = params.checked;
    this.score              = params.score;
    this.autocheck          = params.autocheck;
    this.user_score         = params.user_score || 0;
    this.content            = params.content;
    params.options.forEach(option => {
      this.options.push(new ResponseOption(option));
    });
  }

  @action change = (attr, val) => {
    this[attr] = val;
  }

  @action toggleCorrectOption = (optionId) => {
    if (this.field_type === 'dropdown' || this.field_type === 'radio_buttons' || this.field_type === 'inline_dropdown') {
      this._selectSingleCorrectOption(optionId);
    } else if (this.field_type === 'checkboxes') {
      this._selectMultipleCorrectOption(optionId);
    }
  }

  @computed get hasCorrectOptions() {
    return FIELD_TYPES.find(f => f.name === this.field_type).hasCorrectOptions;
  }

  @action _selectMultipleCorrectOption = (optionId) => {
    const selected = this.options.find(option => option.uuid === optionId);
    selected.change('user_selected', !selected.user_selected);
  }

  @action _selectSingleCorrectOption = (optionId) => {
    this.options.forEach(option => option.change('user_selected', false));
    const correct = this.options.find(option => option.uuid === optionId);
    correct.change('user_selected', true);
  }

  @computed get prettyName() {
    return FIELD_TYPES.find(f => f.name === this.field_type).label;
  }

  @computed get hasOptions() {
    return FIELD_TYPES.find(f => f.name === this.field_type).hasOptions;
  }

  @computed get tooltip() {
    return FIELD_TYPES.find(f => f.name === this.field_type).tooltip;
  }

  @action moveOption = (dragId, hoverId) => {
    const dragOption = this.options.find(option => option.uuid === dragId);

    const dragIndex  = findIndex(this.options, option => option.uuid === dragId);
    const hoverIndex = findIndex(this.options, option => option.uuid === hoverId);

    this.options.splice(dragIndex, 1);
    this.options.splice(hoverIndex, 0, dragOption);
  }

}

export default ResponseField;
