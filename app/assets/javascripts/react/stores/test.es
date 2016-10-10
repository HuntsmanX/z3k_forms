import { observable, action } from "mobx";

import TestSection from "./test-section.es";

class Test {

  @observable sections = [];

  constructor(params) {
    params.sections.forEach(section => {
      this.sections.push(
        new TestSection(section)
      );
    });
  }

  @action addSection() {
    this.sections.push(
      new TestSection()
    );
  }

  @action deleteSection(index) {
    this.sections.splice(index, 1);
  }

  @action moveSection(dragIndex, hoverIndex) {
    const dragSection = this.sections[dragIndex];

    this.sections.splice(dragIndex, 1);
    this.sections.splice(hoverIndex, 0, dragSection);
  }

}

export default Test;
