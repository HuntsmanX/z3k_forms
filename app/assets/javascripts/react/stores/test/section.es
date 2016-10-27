import { observable, action, computed } from "mobx";
import uuid from "node-uuid";
import humanize from "underscore.string/humanize";

import Question from "./question.es";

class Section {

  @observable id                     = null;
  @observable title                  = 'Untitled Section';
  @observable description            = 'Section description';
  @observable time_limit             = 0;
  @observable bonus_time             = 0;
  @observable required_score         = 0;
  @observable required_score_units   = 'points';
  @observable shuffle_questions      = true;
  @observable questions_to_show      = 0;
  @observable show_next_section      = 'always';
  @observable acceptable_score       = 0;
  @observable acceptable_score_units = 'points';
  @observable questions              = [];

  @observable isExpanded             = false;
  @observable isBeingEdited          = false;
  @observable isBeingSaved           = false;
  @observable errors                 = [];

  uuid = uuid.v4();

  showNextSectionMap = {
    always: 'Regardless of Score',
    score:  'Score is Acceptable'
  }

  scoreUnitsMap = {
    points:  'Points',
    percent: 'Percent'
  }

  constructor(params = {}) {
    this._fromJSON(params);
  }

  @computed get persisted() {
    return !!this.id;
  }

  @computed get timeLimitLabel() {
    if (this.time_limit == 0) return 'None';
    return this.time_limit.length || typeof this.time_limit === "number" ?
      this.time_limit + ' minutes' :
      'None'
  }

  @computed get bonusTimeLabel() {
    if (this.bonus_time == 0) return 'None';
    return this.bonus_time.length || typeof this.bonus_time === "number" ?
      this.bonus_time + ' minutes' :
      'None'
  }

  @computed get requiredScoreLabel() {
    if (typeof this.required_score === "string" && !this.required_score.length) return 0;
    return this.required_score;
  }

  @computed get showNextSectionLabel() {
    return this.showNextSectionMap[this.show_next_section];
  }

  @computed get requiredScoreUnitsLabel() {
    return this.scoreUnitsMap[this.required_score_units];
  }

  @computed get acceptableScoreUnitsLabel() {
    return this.scoreUnitsMap[this.acceptable_score_units];
  }

  @computed get questionsToShowLabel() {
    if (this.questions_to_show == 0 || this.questions_to_show == '') return 'All';
    return this.questions_to_show;
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

  @computed get warnings() {
    var ret = [];
    if (!this.isExpanded && this.questions.find(q => q.edited)) {
      ret.push('This section has unsaved questions');
    }
    if (this.required_score > this.maxScore && this.required_score_units === 'points') {
      ret.push('Required score is larger than max score');
    }
    if (this.acceptable_score > this.maxManualScore && this.acceptable_score_units === 'points') {
      ret.push('Acceptable autoscore is larger than max autoscore');
    }
    return ret;
  }

  @action toggle = () => {
    this.isExpanded = !this.isExpanded;
  }

  @action change(attr, val) {
    this[attr] = val;
  }

  @action addQuestion = () => {
    this.questions.push(
      new Question({ section_id: this.id, isBeingEdited: true, order_index: this.questions.length, edited: true })
    );
    this.questions[this.questions.length - 1].focus();
  }

  @action deleteQuestion = (index) => {
    if (!confirm(`Are you sure you want to delete this question?`)) return;

    this.questions[index].destroy().then(
      () => this.questions.splice(index, 1)
    );
  }

  @action moveQuestion = (dragIndex, hoverIndex) => {
    const dragQuestion = this.questions[dragIndex];

    this.questions.splice(dragIndex, 1);
    this.questions.splice(hoverIndex, 0, dragQuestion);

    this._persistQuestionsOrder();
  }

  @action edit = () => {
    this.isBeingEdited = true;
    this.focus();
  }

  @action save = () => {
    this.isBeingSaved = true;
    this.errors = [];

    const url  = this.id ? `/test/sections/${this.id}` : '/test/sections';
    const type = this.id ? 'PATCH' : 'POST';

    $.ajax({
      url:  url,
      type: type,
      data: this.serialize()
    }).then(
      data => {
        this._fromJSON(data);
        this.isBeingSaved  = false;
        this.isBeingEdited = false;
      },
      data => {
        if (data.status === 422) {
          this._setErrors(data.responseJSON.errors);
        } else {
          alert(`Server error occured: ${data.status}, ${data.statusText}`);
        }
        this.isBeingSaved = false;
      }
    );
  }

  @action destroy = () => {
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

  @action assignTitleInputRef = (input) => {
    this.titleInputRef = input;
  }

  @action focus = () => {
    setTimeout(() => {
      this.titleInputRef && this.titleInputRef.focus();
    }, 0);
  }

  @action _fromJSON = (params) => {
    if (params.id) this.id = params.id;

    this.test_id     = params.test_id;
    this.order_index = params.order_index;

    const attrs = [
      'title',
      'description',
      'time_limit',
      'bonus_time',
      'required_score',
      'required_score_units',
      'shuffle_questions',
      'questions_to_show',
      'show_next_section',
      'acceptable_score',
      'acceptable_score_units'
    ];

    attrs.forEach(attr => this[attr] = params[attr] || this[attr]);

    (params.questions || []).forEach(question => {
      this.questions.push(new Question(question));
    });

    this.isBeingEdited  = params.isBeingEdited  || this.isBeingEdited;
  }

  @action serialize = () => {
    return {
      section: {
        test_id:                 this.test_id,
        title:                   this.title,
        description:             this.description,
        time_limit:              this.time_limit,
        bonus_time:              this.bonus_time,
        required_score:          this.required_score,
        required_score_units:    this.required_score_units,
        shuffle_questions:       this.shuffle_questions,
        questions_to_show:       this.questions_to_show,
        show_next_section:       this.show_next_section,
        acceptable_score:        this.acceptable_score,
        acceptable_score_units:  this.acceptable_score_units,
        order_index:             this.order_index
      }
    };
  }

  @action _setErrors = (errors) => {
    this.errors = Object.keys(errors).map(attr => {
      return `${humanize(attr)} ${errors[attr].join(', ')}`;
    });
  }

  @action _persistQuestionsOrder = () => {
    let order = {};

    this.questions.forEach((q, i) => {
      q.change('order_index', i);
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

}

export default Section;
