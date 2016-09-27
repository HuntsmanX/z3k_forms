import { observable, action, computed } from "mobx";
import { convertFromRaw } from 'draft-js';
import { stateToHTML } from 'draft-js-export-html';

import QuestionOption from "./question-option.es";

class TestQuestion {

  @observable content    = {entityMap:{},blocks:[{key:"2psf7",text:"Untitled question",type:"unstyled",depth:0,inlineStyleRanges:[],entityRanges:[],data:{}}]};
  @observable isExpanded = false;
  @observable type       = 'single_choice';
  @observable autoCheck  = false;
  @observable options    = [new QuestionOption(this)];

  @computed get htmlContent() {
    return stateToHTML(convertFromRaw(this.content), {
      inlineStyles: {
        CODE: { element: 'code' }
      }
    });
  }

  @action toggle() {
    this.isExpanded = !this.isExpanded;
  }

  @action change(attr, val) {
    this[attr] = val;
  }

  @action addOption() {
    this.options.push(
      new QuestionOption(this)
    );
  }

  @action deleteOption(index) {
    this.options.splice(index, 1);
  }

  @action onOptionCorrectChange() {
    if (this.type === 'single_choice') {
      this.options.forEach(option => {
        option.isCorrect = false;
      });
    }
  }

  @action moveOption(dragIndex, hoverIndex) {
    const dragOption = this.options[dragIndex];

    this.options.splice(dragIndex, 1);
    this.options.splice(hoverIndex, 0, dragOption);
  }

}

export default TestQuestion;
