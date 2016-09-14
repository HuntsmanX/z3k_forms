import { observable, action } from "mobx";

import Question from "./question.es";

class Form {

  @observable questions = [];

  constructor(form) {
    form.questions.forEach(question => {
      this.questions.push(
        new Question(question)
      );
    });
  }

  @action addQuestion() {
    this.questions.push(
      new Question({ isBeingEdited: true })
    );
  }

}

export default Form;
