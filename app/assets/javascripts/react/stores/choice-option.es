import { observable, action } from "mobx";
import uuid from "node-uuid";

class ChoiceOption {

  @observable content = '';

  uuid = uuid.v4();

  construction(options) {
    Object.keys(options).forEach(key => {
      this[key] = options[key];
    });
  }

  @action change(attr, val) {
    this[attr] = val;
  }

}

export default ChoiceOption;
