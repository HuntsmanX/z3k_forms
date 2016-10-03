import {observable, action, computed} from "mobx";
import Question from "./test-question.es";

class TestSection {
  @observable title = 'Untitled Section';
  @observable time = '';
  @observable questions = [];
  @observable isExpanded = false;
  @observable isShown = false;


  @action toggle() {
    this.isExpanded = !this.isExpanded;
  }

  @action change(attr, val) {
    this[attr] = val;
  }

  @action addQuestion() {
    this.questions.push(new Question({isExpanded: true}));
  }

  @action showEdit() {
    this.isShown = !this.isShown;
  }
  
  @action save() {
    var testId = location.pathname.split('/')[2]
    $.ajax({
      url: '/tests/'+testId+'/sections',
      type: 'POST',
      data: { section: { name: this.title, time_for_test: this.time } },
      success: (response) => {
        console.log('it worked!', response);
        section.showEdit()
      }
    })
  }
  
}

export default TestSection;