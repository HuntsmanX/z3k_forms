import { observable, action, computed } from "mobx";
import uuid from "node-uuid";

class QuestionOption {

  @observable content   = '';
  @observable isCorrect = false;

  uuid = uuid.v4();

  constructor(question) {
    this.question = question;
  }

  @action change(attr, val) {
    if (attr === 'isCorrect') {
      this.question.onOptionCorrectChange();
    }
    this[attr] = val;
  }

}

export default QuestionOption;
