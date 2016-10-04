import { observable, action } from "mobx";

import TestSection from "./test-section.es";

class Test {

  @observable sections = [];

  @action addSection() {
    this.sections.push(
      new TestSection()
    );
  }

  @action deleteSection(index) {
    this.sections.splice(index, 1);
  }

}

export default Test;
