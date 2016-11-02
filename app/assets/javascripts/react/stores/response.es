import { observable, action } from "mobx";

import Section from "./response/response-section.es";

class Response {
  @observable sections = [];

  constructor(params) {
    this.id = params.id;
    params.sections.forEach(section => {
      this.sections.push(
        new Section(section)
      );
    });
  }


}
export default Response;
