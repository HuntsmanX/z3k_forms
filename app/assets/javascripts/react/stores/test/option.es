import { observable, action, computed } from "mobx";
import uuid from "node-uuid";

class Option {

  @observable id         = null;
  @observable content    = '';
  @observable is_correct = false;
  @observable _destroy   = false;

  uuid = uuid.v4();

  constructor(params = {}) {
    this._fromJSON(params);
  }

  @action change = (attr, val) => {
    this[attr] = val;
  }

  @action assignInputRef = (ref) => {
    this.inputRef = ref;
  }

  @action focus = () => {
    setTimeout(() => {
      this.inputRef && this.inputRef.focus();
    }, 0);
  }

  @action _fromJSON = (params) => {
    if (params.id) this.id = params.id;

    this.content    = params.content    || this.content;
    this.is_correct = params.is_correct || this.is_correct;
  }

}

export default Option;
