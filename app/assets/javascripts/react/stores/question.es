import { observable, action } from "mobx";
import uuid from "node-uuid";

import Option from "./choice-option.es";

class Question {

  @observable content       = '';
  @observable question_type = 'short_answer';
  @observable options       = [];

  @observable isBeingEdited = false;
  @observable isBeingSaved  = false;

  uuid = uuid.v4();

  constructor(options) {
    Object.keys(options).forEach(key => {
      this[key] = options[key];
    });
  }

  @action change(attr, val) {
    this[attr] = val;
  }

  @action edit(val = true) {
    this.isBeingEdited = val;
  }

  @action addOption() {
    this.options.push(
      new Option()
    );
  }

  @action deleteOption(index) {
    this.options.splice(index, 1);
  }

  @action save() {
    this.isBeingSaved = true;

    this.sync().then(
      data => {
        this.isBeingSaved  = false;
        this.isBeingEdited = false;
      },
      data => {
        this.isBeingSaved  = false;
        console.log(data.responseJSON);
      }
    );
  }

  sync() {
    const type = this.id ? 'PATCH' : 'POST';
    const url  = this.id ? `/questions/${this.id}` : '/questions';

    return $.ajax({
      type:     type,
      url:      url,
      dataType: 'json',
      data:     {
        question: {
          test_id:       this.test_id,
          content:       this.content,
          question_type: this.question_type
        }
      }
    });
  }

}

export default Question;
