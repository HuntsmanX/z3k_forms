import { observable, action, computed } from "mobx";
import Question from "./test-question.es";
import TestQuestion from "./../stores/test-question.es";

class TestSection {
    @observable title      = 'Untitled Section'
    @observable time       = '';
    @observable questions  = [];
    @observable isExpanded = false;
    @observable isShown    = false;
  
  
    @action toggle() {
        this.isExpanded = !this.isExpanded;
    }

    @action change(attr, val) {
        this[attr] = val;
    }
  
    @action addQuestion(){
      this.questions.push(new Question());
    }
  
    @action showEdit() {
      this.isShown = !this.isShown;
    }



}

export default TestSection;