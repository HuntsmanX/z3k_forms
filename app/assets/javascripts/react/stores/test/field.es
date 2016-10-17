import { observable, action, computed } from "mobx";
import uuid from "node-uuid";

import Option from "./option.es";

class Field {

  @observable content   = '';
  @observable score     = 0;
  @observable autocheck = true;
  @observable options   = [new Option()];

  uuid = uuid.v4();

  constructor(params) {
    this.type     = params.type;
    this.blockKey = params.blockKey;
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

  @action change(attr, val) {
    this[attr] = val;
  }

  @action addOption() {
    this.options.push(
      new Option()
    );
  }

  @action deleteOption(index) {
    this.options.splice(index, 1);
  }

  @action moveOption(dragIndex, hoverIndex) {
    const dragOption = this.options[dragIndex];

    this.options.splice(dragIndex, 1);
    this.options.splice(hoverIndex, 0, dragOption);
  }

  @action toggleAutocheck() {
    this.autocheck = !this.autocheck;
  }

}

export default Field;
