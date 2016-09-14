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

    this.test_id = form.id;
  }

  @action addQuestion() {
    this.questions.push(
      new Question({ isBeingEdited: true, test_id: this.test_id })
    );
  }

}

export default Form;
