import { observer } from "mobx-react";

import Form         from "./../stores/form.es";
import ShowQuestion from "./edit-form/show-question.es";
import EditQuestion from "./edit-form/edit-question.es";

@observer
class EditForm extends React.Component {

  constructor(props) {
    super();
    this.form = new Form(props.test);
  }

  addQuestion(event) {
    this.form.addQuestion();
  }

  render() {
    return (
      <div id="edit-test-form">
        <div style={{ border: '1px solid #777', padding: '1rem' }}>
          A form for editing test properties such as time limit, number of required questions etc. goes here
        </div>
        <br />

        <h3>Questions</h3>

        <ul className="questions">
          {this.form.questions.map((question, index) => {
            return question.isBeingEdited ?
              <EditQuestion question={question} key={question.uuid} /> :
              <ShowQuestion question={question} key={question.uuid} />
          })}
        </ul>

        <div className="clearfix">
          <div className="float-right">
            <button
              type="button"
              className="button small"
              onClick={this.addQuestion.bind(this)}
            >
              Add Question
            </button>
          </div>
        </div>

      </div>
    );
  }

}

export default EditForm;
