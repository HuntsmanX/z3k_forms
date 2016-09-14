import { observable, action } from "mobx";
import uuid from "node-uuid";

class Question {

  @observable content       = '';
  @observable isBeingEdited = false;

  uuid = uuid.v4();

  constructor(options) {
    Object.keys(options).forEach(key => {
      this[key] = options[key];
    });
  }

  @action change(attr, val) {
    this[attr] = val;
  }

  @action edit(val = true) {
    this.isBeingEdited = val;
  }

  @action save() {
    console.log(this.id);
    this.isBeingEdited = false;
  }

}

export default Question;
