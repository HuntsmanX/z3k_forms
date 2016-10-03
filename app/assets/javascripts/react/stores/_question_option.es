import { observable, action, computed } from "mobx";
import uuid from "node-uuid";

class QuestionOption {

  @observable content   = '';
  @observable isCorrect = false;

  uuid = uuid.v4();

  @action change(attr, val) {
    this[attr] = val;
  }

}

export default QuestionOption;
