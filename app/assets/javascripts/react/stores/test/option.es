import { observable, action, computed } from "mobx";
import uuid from "node-uuid";

class Option {

  @observable content    = '';
  @observable is_correct = false;

  uuid = uuid.v4();

  @action change(attr, val) {
    this[attr] = val;
  }

}

export default Option;
