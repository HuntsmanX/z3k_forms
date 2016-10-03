import { observer } from "mobx-react";

import Draft from "./../draft.es";
import LabeledWrapper from "./labeled-wrapper.es";

import EditSingleChoice from "./edit-single-choice.es";
import EditSequence     from "./edit-sequence.es";

@observer
class QuestionEdit extends React.Component {

  change(attr, event) {
    this.props.question.change(
      attr, event.target && event.target.value || event
    );
  }

  renderQuestionTypeFields() {
    const question = this.props.question;

    switch(question.type) {
      case 'single_choice':
        return <EditSingleChoice question={question} />;
      case 'multiple_choice':
        return <EditSingleChoice question={question} />;
      case 'sequence':
        return <EditSequence question={question} />;
      default:
        return null;
    }
  }

  render() {
    const { question } = this.props;

    return (
      <div className="callout primary question-edit">
        <form>

          <LabeledWrapper label="Question">
            <div className="large-6 columns">
              <Draft
                value={question.content}
                onChange={this.change.bind(this, 'content')}
                gapsEnabled={question.gapsRequired}
              />
            </div>
          </LabeledWrapper>

          <LabeledWrapper label="Type">
            <div className="large-6 columns">
              <select value={question.type} onChange={this.change.bind(this, "type")}>
                <option value="short_answer">Short Answer</option>
                <option value="paragraph">Paragraph</option>
                <option value="single_choice">Single Choice</option>
                <option value="multiple_choice">Multiple Choice</option>
                <option value="sequence">Sequence</option>
                <option value="gaps">Gaps</option>
              </select>
            </div>
          </LabeledWrapper>

          {this.renderQuestionTypeFields()}

          <footer className="clearfix">
            <div className="float-right">
              <button className="button tiny">Save</button>
            </div>
          </footer>
        </form>
      </div>
    );
  }

}

export default QuestionEdit;
