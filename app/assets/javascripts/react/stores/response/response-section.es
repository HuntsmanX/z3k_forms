import { observable, action } from "mobx";
import ResponseQuestion from "./response-question.es";

class ResponseSection {
  @observable id             = null;
  @observable title          = 'Untitled Section';
  @observable description    = 'Section description';
  @observable time_limit     = 0;
  @observable required_score = 0;
  @observable questions      = [];
  @observable uuid           = null;

  constructor(params = {}) {
    this.fromJSON(params);
  }

  fromJSON(params) {
    if (params.id) this.id = params.id;
    this.title             = params.title;
    this.description       = params.description;
    this.time_limit        = params.time_limit;
    this.required_score    = params.required_score;
    this.uuid              = params.uuid;
    this.response_id       = params.response_id;

    params.questions.forEach(question => {
      this.questions.push(new ResponseQuestion(question));
    });
  }  
}

export default ResponseSection;