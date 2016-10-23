import { observable, action, computed } from "mobx";
import uuid from "node-uuid";
import { findIndex } from "lodash/array";
import humanize from "underscore.string/humanize";

import Option from "./option.es";

class Field {

  @observable id        = null;
  @observable content   = '';
  @observable score     = 1;
  @observable autocheck = false;
  @observable _options  = [];
  @observable _destroy  = false;
  @observable errors    = [];

  uuid = uuid.v4();

  constructor(params = {}) {
    this._fromJSON(params);

    const needOptions = ['dropdown', 'checkboxes', 'radio_buttons', 'sequence'];

    if (!this.id && needOptions.indexOf(this.type) + 1) {
      this._options.push(
        new Option({ content: 'Option 1', is_correct: true })
      );
      this._options.push(
        new Option({ content: 'Option 2', is_correct: false })
      );
    }
  }

  @computed get hasOptions() {
    return !!(['dropdown', 'checkboxes', 'radio_buttons', 'sequence'].indexOf(this.type) + 1);
  }

  @computed get hasCorrectOptions() {
    return !!(['dropdown', 'checkboxes', 'radio_buttons'].indexOf(this.type) + 1);
  }

  @computed get prettyName() {
    switch(this.type) {
      case 'text_input':    return 'Text Input';
      case 'text_area':     return 'Text Area';
      case 'dropdown':      return 'Dropdown';
      case 'checkboxes':    return 'Checkboxes';
      case 'radio_buttons': return 'Radio Buttons';
      case 'sequence':      return 'Sequence';
      case 'text_editor':   return 'Text Editor';
    }
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
    if (this.type === 'dropdown' || this.type === 'radio_buttons') {
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

    this._options = (params.options || []).map(option => {
      return new Option(option);
    });
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
