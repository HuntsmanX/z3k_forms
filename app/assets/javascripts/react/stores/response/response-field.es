import { observable, action, computed } from "mobx";
import { findIndex } from "lodash/array";
import Editor from "./response-field-editor.es";
import uuid from "node-uuid";

import ResponseOption from "./response-option.es";

class ResponseField {
  @observable id             = null;
  @observable user_content   = '';
  @observable autocheck      = true;
  @observable options        = [];
  @observable editor         = null;
  @observable user_score     = null;
  uuid = uuid.v4();

  constructor(params = {}) {
    this.fromJSON(params);
  }

  fromJSON(params) {
    if (params.id) this.id  = params.id;
    this.field_type         = params.field_type;
    this.blockKey           = params.blockKey || params.block_key;
    this.user_content       = params.user_content;
    this.user_score         = params.user_score;
    this.editor = new Editor();
    this.options = params.options.map(option => {
      return new ResponseOption(option);
    });
  }

  @action change = (attr, val) => {
    this[attr] = val;
  }

  @action toggleCorrectOption = (optionId) => {
    if (this.field_type === 'dropdown' || this.field_type === 'radio_buttons') {
      this._selectSingleCorrectOption(optionId);
    } else if (this.field_type === 'checkboxes') {
      this._selectMultipleCorrectOption(optionId);
    }
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

  @action moveOption = (dragId, hoverId) => {
    const dragOption = this.options.find(option => option.uuid === dragId);

    const dragIndex  = findIndex(this.options, option => option.uuid === dragId);
    const hoverIndex = findIndex(this.options, option => option.uuid === hoverId);

    this.options.splice(dragIndex, 1);
    this.options.splice(hoverIndex, 0, dragOption);
  }

}
export default ResponseField;
