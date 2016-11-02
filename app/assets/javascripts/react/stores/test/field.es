import { observable, action, computed } from "mobx";
import uuid from "node-uuid";
import { findIndex } from "lodash/array";
import humanize from "underscore.string/humanize";

import Option      from "./option.es";
import FieldEditor from "./field-editor.es";

import { FIELD_TYPES } from "./../../shared/field-types.es";

class Field {

  @observable id        = null;
  @observable content   = '';
  @observable score     = 1;
  @observable autocheck = false;
  @observable _options  = [];
  @observable _destroy  = false;
  @observable errors    = [];
  @observable editor    = null;

  uuid = uuid.v4();

  constructor(params = {}) {
    this._fromJSON(params);

    if (!this.id && FIELD_TYPES.find(f => f.name === this.type).hasOptions) {
      this._options.push(new Option({ content: 'Option 1', is_correct: true }));
      this._options.push(new Option({ content: 'Option 2', is_correct: false }));
    }
  }

  @computed get hasOptions() {
    return FIELD_TYPES.find(f => f.name === this.type).hasOptions;
  }

  @computed get hasCorrectOptions() {
    return FIELD_TYPES.find(f => f.name === this.type).hasCorrectOptions;
  }

  @computed get prettyName() {
    return FIELD_TYPES.find(f => f.name === this.type).label;
  }

  @computed get tooltip() {
    return FIELD_TYPES.find(f => f.name === this.type).tooltip;
  }

  @computed get options() {
    return this._options.filter(option => !option._destroy);
  }

  @action change = (attr, val) => {
    this[attr] = val;
  }

  @action addOption = () => {
    this._options.push(
      new Option()
    );
    this._options[this._options.length - 1].focus();
  }

  @action deleteOption = (uuid) => {
    const deleted = this._options.find(option => option.uuid === uuid);
    deleted.change('_destroy', true);
  }

  @action moveOption = (dragId, hoverId) => {
    const dragOption = this._options.find(option => option.uuid === dragId);

    const dragIndex  = findIndex(this._options, option => option.uuid === dragId);
    const hoverIndex = findIndex(this._options, option => option.uuid === hoverId);

    this._options.splice(dragIndex, 1);
    this._options.splice(hoverIndex, 0, dragOption);
  }

  @action toggleAutocheck = () => {
    this.autocheck = !this.autocheck;
  }

  @action toggleCorrectOption = (optionId) => {
    if (this.type === 'dropdown' || this.type === 'radio_buttons' || this.type === 'inline_dropdown') {
      this._selectSingleCorrectOption(optionId);
    } else if (this.type === 'checkboxes') {
      this._selectMultipleCorrectOption(optionId);
    }
  }

  @action setErrors = (errors) => {
    this.errors = Object.keys(errors).map(attr => {
      return `${humanize(attr)} ${errors[attr].join(', ')}`
    });
  }

  @action _fromJSON = (params) => {
    if (params.id) this.id = params.id;

    this.type      = params.type      || params.field_type;
    this.blockKey  = params.blockKey  || params.block_key;
    this.content   = params.content   || this.content;
    this.score     = params.score     || this.score;
    this.autocheck = params.autocheck || this.autocheck;

    this._options = (params.options || []).sort((a, b) => {
      return a.order_index - b.order_index;
    }).map(option => {
      return new Option(option);
    });

    this.editor = new FieldEditor(this.content);
  }

  @action _selectSingleCorrectOption = (optionId) => {
    this.options.forEach(option => option.change('is_correct', false));
    const correct = this.options.find(option => option.uuid === optionId);
    correct.change('is_correct', true);
  }

  @action _selectMultipleCorrectOption = (optionId) => {
    const selected = this.options.find(option => option.uuid === optionId);
    selected.change('is_correct', !selected.is_correct);
  }

}

export default Field;
