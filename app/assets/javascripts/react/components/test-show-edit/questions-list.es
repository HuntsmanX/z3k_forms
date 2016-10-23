import { observer } from "mobx-react";

import Question from "./question.es";

@observer
class QuestionsList extends React.Component {

  renderQuestions = () => {
    const { section } = this.props;

    return section.questions.map((question, index) => {
      return <Question
        key={question.uuid}
        index={index}
        question={question}
        deleteQuestion={section.deleteQuestion.bind(null, index)}
        move={section.moveQuestion.bind(section)}
      />;
    });
  }

  render() {
    const { section } = this.props;

    return (
      <div className="questions-list">
        {section.questions.length ? (
          this.renderQuestions()
        ) : (
          <p>No questions yet</p>
        )}

        <div className="clearfix">
          <div className="float-right">
            <a onClick={section.addQuestion}>Add Question</a>
          </div>
        </div>
      </div>
    );
  }

}

export default QuestionsList;
