import { observable, action, computed } from "mobx";
import uuid from "node-uuid";
import humanize from "underscore.string/humanize";

import Question from "./question.es";

class Section {

  @observable id             = null;
  @observable title          = 'Untitled Section';
  @observable description    = 'Section description';
  @observable time_limit     = 0;
  @observable required_score = 0;
  @observable score_units    = 'points';
  @observable questions      = [];

  @observable isExpanded     = false;
  @observable isBeingEdited  = false;
  @observable isBeingSaved   = false;
  @observable errors         = [];

  uuid = uuid.v4();

  constructor(params = {}) {
    this.fromJSON(params);
  }

  fromJSON(params) {
    if (params.id) this.id = params.id;

    this.test_id     = params.test_id;
    this.order_index = params.order_index;

    this.title          = params.title          || this.title;
    this.description    = params.description    || this.description;
    this.time_limit     = params.time_limit     || this.time_limit;
    this.required_score = params.required_score || this.required_score;
    this.score_units    = params.score_units    || this.score_units;

    (params.questions || []).forEach(question => {
      this.questions.push(new Question(question));
    });

    this.isBeingEdited  = params.isBeingEdited  || this.isBeingEdited;
  }

  @computed get persisted() {
    return !!this.id;
  }

  @computed get timeLabel() {
    if (this.time_limit == 0) return 'None';
    return this.time_limit.length || typeof this.time_limit === "number" ?
      this.time_limit + ' minutes' :
      'None'
  }

  @computed get requiredScoreLabel() {
    if (typeof this.required_score === "string" && !this.required_score.length) return 0;
    return this.required_score;
  }

  @computed get maxScore() {
    return this.questions
      .map(question => question.score)
      .reduce((prev, curr) => (+curr || 0) + prev, 0);
  }

  @computed get maxAutoScore() {
    return this.questions
      .map(question => question.autoScore)
      .reduce((prev, curr) => (+curr || 0) + prev, 0);
  }

  @computed get maxManualScore() {
    return this.questions
      .map(question => question.manualScore)
      .reduce((prev, curr) => (+curr || 0) + prev, 0);
  }

  @computed get edited() {
    return !this.isExpanded && this.questions.find(q => q.edited);
  }

  @action toggle() {
    this.isExpanded = !this.isExpanded;
  }

  @action change(attr, val) {
    this[attr] = val;
  }

  @action addQuestion() {
    this.questions.push(
      new Question({ section_id: this.id, isBeingEdited: true, order_index: this.questions.length })
    );
    this.questions[this.questions.length - 1].focus();
  }

  @action deleteQuestion(index) {
    this.questions[index].destroy().then(
      () => this.questions.splice(index, 1)
    );
  }

  @action moveQuestion(dragIndex, hoverIndex) {
    const dragQuestion = this.questions[dragIndex];

    this.questions.splice(dragIndex, 1);
    this.questions.splice(hoverIndex, 0, dragQuestion);

    this.persistQuestionsOrder();
  }

  @action persistQuestionsOrder() {
    let order = {};

    this.questions.forEach((q, i) => {
      q.order_index = i;
      order[q.id]   = i;
    });

    $.ajax({
      url:         '/test/questions/reorder',
      type:        'PUT',
      dataType:    'json',
      contentType: 'application/json',
      data:        JSON.stringify({
        questions_order: order
      })
    }).then(
      null,
      () => alert('Failed to persist questions order')
    );
  }

  @action edit() {
    this.isBeingEdited = true;
    this.focus();
  }

  @action save() {
    this.isBeingSaved = true;
    this.errors = [];

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
          required_score: this.required_score,
          score_units:    this.score_units,
          order_index:    this.order_index
        }
      }
    }).then(
      data => {
        this.fromJSON(data);
        this.isBeingSaved  = false;
        this.isBeingEdited = false;
      },
      data => {
        if (data.status === 422) {
          this.setErrors(data.responseJSON.errors);
        } else {
          alert(`Server error occured: ${data.status}, ${data.statusText}`);
        }
        this.isBeingSaved = false;
      }
    );
  }

  @action setErrors(errors) {
    this.errors = Object.keys(errors).map(attr => {
      return `${humanize(attr)} ${errors[attr].join(', ')}`;
    });
  }

  @action destroy() {
    if (this.id) {
      this.isBeingSaved = true;

      return $.ajax({
        url:  `/test/sections/${this.id}`,
        type: 'DELETE'
      });
    } else {
      return Promise.resolve();
    }
  }

  @action assignTitleInputRef(input) {
    this.titleInputRef = input;
  }

  @action focus() {
    setTimeout(() => {
      this.titleInputRef && this.titleInputRef.focus();
    }, 0);
  }

  @action toggleScoreUnits() {
    if (this.score_units === 'points') {
      this.score_units = 'percent';
    } else {
      this.score_units = 'points';
    }
  }

}

export default Section;
