import { observable, action } from "mobx";
import uuid from "node-uuid";
import ResponseQuestion from './response-question.es'

class ResponseSection{
  @observable title       = '';
  @observable time_limit  = null;
  @observable description = '';
  @observable questions   = [];
  @observable id          = null;

  uuid = uuid.v4();

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
    }).done(function( data ) {
      window.location.href = data
    });
  }

  @action serialize = () => {
    return {
      section: {
        id:                   this.id,
        title:                this.title,
        time_limit:           this.time_limit,
        questions_attributes: this.questions.map(this.serializeQuestion)
      }
    }
  }

  @action serializeQuestion = (question, index) => {
    return {
        id:                question.id,
        section_id:        question.section_id,
        content:           question.editor.serialize(),
        order_index:       question.order_index,
        fields_attributes: question.fields.map(this.serializeField)
    }
  }

  @action serializeField = (field, index) => {
    return {
      id:                 field.id,
      block_key:          field.blockKey,
      user_content:       field.user_content,
      autocheck:          field.autocheck,
      field_type:         field.type,
      options_attributes: field.options.map(this.serializeOption)
    };
  }

  @action serializeOption = (option, index) => {
    return {
      id:             option.id,
      content:        option.content,
      user_selected:  option.user_selected,
      order_index:    index
    };
  }

}
export default ResponseSection;
