import { observable, action, computed } from "mobx";
import uuid from "node-uuid";
import { findIndex } from "lodash/array";

import ResponseOption from "./response-option.es";

class ResponseField {
  @observable id        = null;
  @observable content   = '';
  @observable score     = 0;
  @observable autocheck = true;
  @observable options  = [];

  uuid = uuid.v4();

  constructor(params = {}) {
    this.fromJSON(params);

    const needOptions = ['dropdown', 'checkboxes', 'radio_buttons', 'sequence'];

    if (!this.id && needOptions.indexOf(this.type) + 1) {
      this.options.push(
        new ResponseOption({ content: 'Option 1', is_correct: true })
      );
      this.options.push(
        new ResponseOption({ content: 'Option 2', is_correct: false })
      );
    }
  }

  fromJSON(params) {
    if (params.id) this.id = params.id;

    this.type     = params.type;    
    this.blockKey = params.blockKey || params.block_key;
    this.content  = params.content; 
    this.score    = params.score;
    
    this.options = params.options.map(option => {
      return new ResponseOption(option);
    });
  }
    
}
export default ResponseField;