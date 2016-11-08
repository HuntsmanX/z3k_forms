import { observable, action, computed } from "mobx";
import uuid from "node-uuid";

class ResponseOption {

  @observable content       = '';
  @observable user_selected = false;
  @observable is_correct    = false;

  uuid = uuid.v4();

  constructor(params = {}) {
   this.fromJSON(params);
  }

  fromJSON(params) {
    this.id = params.id;

    this.content       = params.content;
    this.user_selected = params.user_selected || this.user_selected;
    this.is_correct    = params.is_correct || this.is_correct;
  }

  @action change = (attr, val) => {
    this[attr] = val;
  }

}

export default ResponseOption;
