import { observable, action } from "mobx";
import uuid from "node-uuid";
import ResponseQuestion from './response-question.es'

class ResponseSection{
  @observable title       = '';
  @observable time_limit  = null;
  @observable description = '';
  @observable questions   = [];

  uuid = uuid.v4();

  constructor(params={}) {
    this.fromJSON(params)
  }

  fromJSON(params) {
    this.title       = params.title;
    this.time_limit  = params.time_limit;
    this.description = params.description;
    this.questions   = params.questions.map(field => {
      return new ResponseQuestion(field)
    });
  }

}
export default ResponseSection;
