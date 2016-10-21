import { observable, action, computed } from "mobx";
import uuid from "node-uuid";

import ResponseOption from "./response-option.es";

class ResponseField {
  @observable id             = null;
  @observable user_content   = '';
  @observable autocheck      = true;
  @observable options        = [];

  uuid = uuid.v4();

  constructor(params = {}) {
    this.fromJSON(params);
  }

  fromJSON(params) {
    if (params.id) this.id  = params.id;
    this.field_type         = params.field_type;
    this.blockKey           = params.blockKey || params.block_key;
    this.user_content       = params.user_content;

    this.options = params.options.map(option => {
      return new ResponseOption(option);
    });
  }

}
export default ResponseField;
