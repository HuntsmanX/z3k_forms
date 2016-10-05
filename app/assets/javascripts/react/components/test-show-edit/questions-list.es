import { observer } from "mobx-react";

import Question from "./question.es";

@observer
class QuestionsList extends React.Component {

  addQuestion() {
    this.props.section.addQuestion();
  }

  deleteQuestion(index) {
    this.props.section.deleteQuestion(index);
  }

  render() {
    const { section } = this.props;

    return (
      <div className="questions-list">
        {section.questions.length ? (
          section.questions.map((question, index) => {
            return <Question
              key={question.uuid}
              index={index}
              question={question}
              deleteQuestion={this.deleteQuestion.bind(this, index)}
              move={section.moveQuestion.bind(section)}
            />;
          })
        ) : (
          <p>No questions yet</p>
        )}
        <div className="clearfix">
          <div className="float-right">
            <a onClick={this.addQuestion.bind(this)}>Add Question</a>
          </div>
        </div>
      </div>
    );
  }

}

export default QuestionsList;
