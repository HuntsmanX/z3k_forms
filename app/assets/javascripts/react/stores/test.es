import { observable, action } from "mobx";

import Section from "./test/section.es";

class Test {

  @observable sections = [];

  constructor(params) {
    this.id = params.id;
    params.sections.forEach(section => {
      this.sections.push(
        new Section(section)
      );
    });
  }

  @action addSection() {
    this.sections.push(
      new Section({ test_id: this.id, isBeingEdited: true })
    );
  }

  @action deleteSection(index) {
    this.sections[index].destroy().then(
      () => this.sections.splice(index, 1)
    );
  }

  @action moveSection(dragIndex, hoverIndex) {
    const dragSection = this.sections[dragIndex];

    this.sections.splice(dragIndex, 1);
    this.sections.splice(hoverIndex, 0, dragSection);
  }

}

export default Test;
