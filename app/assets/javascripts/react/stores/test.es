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

  @action addSection = () => {
    this.sections.push(
      new Section({ test_id: this.id, isBeingEdited: true, order_index: this.sections.length })
    );
    this.sections[this.sections.length - 1].focus();
  }

  @action deleteSection = (index) => {
    const section = this.sections[index];

    if (!confirm(`Are you sure you want to delete '${section.title}' section?`)) return;

    section.destroy().then(
      () => this.sections.splice(index, 1)
    );
  }

  @action moveSection = (dragIndex, hoverIndex) => {
    const dragSection = this.sections[dragIndex];

    this.sections.splice(dragIndex, 1);
    this.sections.splice(hoverIndex, 0, dragSection);

    this.persistSectionsOrder();
  }

  @action persistSectionsOrder = () => {
    let order = {};

    this.sections.forEach((s, i) => {
      s.change('order_index', i);
      order[s.id]   = i;
    });

    $.ajax({
      url:         '/test/sections/reorder',
      type:        'PUT',
      dataType:    'json',
      contentType: 'application/json',
      data:        JSON.stringify({
        sections_order: order
      })
    }).then(
      null,
      () => alert('Failed to persist sections order')
    );
  }

}

export default Test;
