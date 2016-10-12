import { observable, action, computed } from "mobx";
import uuid from "node-uuid";

import Question from "./question.es";

class Section {

  @observable id             = null;
  @observable title          = 'Untitled Section';
  @observable description    = 'Section description';
  @observable time_limit     = 0;
  @observable required_score = 0;
  @observable questions      = [];

  @observable isExpanded     = false;
  @observable isBeingEdited  = false;
  @observable isBeingSaved   = false;
  @observable isBeingDeleted = false;
  @observable questions      = [];

  uuid = uuid.v4();

  constructor(params = {}) {
    params.questions.forEach(question => {
      this.questions.push( new Question(question))
    });
    this.fromJSON(params);
  }

  fromJSON(params) {
    if (params.id) this.id = params.id;

    this.test_id = params.test_id;

    this.title          = params.title          || this.title;
    this.description    = params.description    || this.description;
    this.time_limit     = params.time_limit     || this.time_limit;
    this.required_score = params.required_score || this.required_score;

    this.isBeingEdited  = params.isBeingEdited  || this.isBeingEdited;
  }

  @computed get persisted() {
    return !!this.id;
  }

  @computed get timeLabel() {
    return this.time_limit.length || typeof this.time_limit === "number" ?
      this.time_limit + ' minutes' :
      'None'
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
      new Question({section_id: this.id})
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
    this.isBeingSaved = true;

    const url  = this.id ? `/test/sections/${this.id}` : '/test/sections';
    const type = this.id ? 'PATCH' : 'POST';

    $.ajax({
      url:  url,
      type: type,
      data: {
        section: {
          test_id:        this.test_id,
          title:          this.title,
          description:    this.description,
          time_limit:     this.time_limit,
          required_score: this.required_score
        }
      }
    }).then(
      data => {
        this.fromJSON(data);
        this.isBeingSaved  = false;
        this.isBeingEdited = false;
      },
      data => {
        this.isBeingSaved = false;
        console.log(data);
      }
    );
  }

  @action destroy() {
    if (this.id) {
      this.isBeingDeleted = true;

      return $.ajax({
        url:  `/test/sections/${this.id}`,
        type: 'DELETE'
      });
    } else {
      return Promise.resolve();
    }
  }

}

export default Section;
