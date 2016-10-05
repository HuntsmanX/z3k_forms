import { observable, action, computed } from "mobx";
import uuid from "node-uuid";

import Question from "./test-question.es";

class TestSection {

  @observable title         = 'Untitled Section';
  @observable description   = 'Section description';
  @observable time          = '';
  @observable requiredScore = 0;
  @observable questions     = [];
  @observable isExpanded    = false;
  @observable isBeingEdited = false;

  uuid = uuid.v4();

  @computed get timeLabel() {
    return this.time.length ? this.time : 'None'
  }

  @computed get maxScore() {
    return this.questions.map(question => {
      return question.score;
    }).reduce((prev, curr) => {
      return (+curr || 0) + prev;
    }, 0);
  }

  @action toggle() {
    this.isExpanded = !this.isExpanded;
  }

  @action change(attr, val) {
    this[attr] = val;
  }

  @action addQuestion() {
    this.questions.push(
      new Question()
    );
  }

  @action deleteQuestion(index) {
    this.questions.splice(index, 1);
  }

  @action moveQuestion(dragIndex, hoverIndex) {
    const dragQuestion = this.questions[dragIndex];

    this.questions.splice(dragIndex, 1);
    this.questions.splice(hoverIndex, 0, dragQuestion);
  }

  @action edit() {
    this.isBeingEdited = true;
  }

  @action save() {
    this.isBeingEdited = false;
    // var testId = location.pathname.split('/')[2]
    // $.ajax({
    //   url: '/tests/'+testId+'/sections',
    //   type: 'POST',
    //   data: { section: { name: this.title, time_for_test: this.time } },
    //   success: (response) => {
    //     console.log('it worked!', response);
    //     section.showEdit()
    //   }
    // })
  }

}

export default TestSection;
