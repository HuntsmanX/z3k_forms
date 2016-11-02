import { observable, action } from "mobx";
import uuid from "node-uuid";
import ResponseQuestion from './response-question.es'

class ResponseSection{

  constructor(params={}) {
    this.fromJSON(params)
  }

  fromJSON(params) {
    this.id          = params.id;
    this.title       = params.title;
    this.time_limit  = params.time_limit;
    this.description = params.description;

    this.questions   = params.questions.map(field => {
      return new ResponseQuestion(field)
    });
  }

  @action update = () => {
    const title = this.title;
    const questions = this.questions;

    const url  = `/response/sections/${this.id}`
    const type = 'PATCH'

    $.ajax({
      url:         url,
      type:        type,
      dataType:    'json',
      contentType: 'application/json',
      data:        JSON.stringify(this.serialize())
    }).done(
      data => window.location.href = data
    );
  }

  @action serialize = () => {
    return {
      section: {
        questions_attributes: this.questions.map(this.serializeQuestion)
      }
    }
  }

  @action serializeQuestion = (question, index) => {
    return {
        id:                question.id,
        fields_attributes: question.fields.map(this.serializeField)
    }
  }

  @action serializeField = (field, index) => {
    return {
      id:                 field.id,
      user_content:       field.field_type === 'text_editor' ? field.editor.serialize() : field.user_content,
      options_attributes: field.options.map(this.serializeOption)
    };
  }

  @action serializeOption = (option, index) => {
    return {
      id:             option.id,
      user_selected:  option.user_selected,
      order_index:    index
    };
  }

}
export default ResponseSection;
