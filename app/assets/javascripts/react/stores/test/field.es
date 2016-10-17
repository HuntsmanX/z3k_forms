import { observable, action, computed } from "mobx";
import uuid from "node-uuid";

import Option from "./option.es";

class Field {

  @observable id        = null;
  @observable content   = '';
  @observable score     = 0;
  @observable autocheck = true;
  @observable _options  = [];
  @observable _destroy  = false;

  uuid = uuid.v4();

  constructor(params = {}) {
    this.fromJSON(params);

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

  fromJSON(params) {
    if (params.id) this.id = params.id;

    this.type     = params.type     || params.field_type;
    this.blockKey = params.blockKey || params.block_key;
    this.content  = params.content  || this.content;
    this.score    = params.score    || this.score;

    this._options = (params.options || []).map(option => {
      return new Option(option);
    });
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

  @action change(attr, val) {
    this[attr] = val;
  }

  @action addOption() {
    this._options.push(
      new Option()
    );
  }

  @action deleteOption(index) {
    this._options[index].change('_destroy', true);
  }

  @action moveOption(dragIndex, hoverIndex) {
    const dragOption = this._options[dragIndex];

    this._options.splice(dragIndex, 1);
    this._options.splice(hoverIndex, 0, dragOption);
  }

  @action toggleAutocheck() {
    this.autocheck = !this.autocheck;
  }

}

export default Field;
