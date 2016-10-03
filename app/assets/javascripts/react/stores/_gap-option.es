import { observable, action, computed } from "mobx";

class GapOption {

  @observable content = '';

  blockKey = null;

  constructor(options) {
    this.blockKey = options.blockKey;
  }

  @action change(attr, val) {
    this[attr] = val;
  }

}

export default GapOption;
