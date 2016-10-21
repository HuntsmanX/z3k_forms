import { observer } from "mobx-react";

import Question from "../response-show-edit/question.es";

@observer
class QuestionsList extends React.Component {

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
            />;
          })
        ) : (
          <p>No questions yet</p>
        )}
      </div>
    );
  }

}

export default QuestionsList;
