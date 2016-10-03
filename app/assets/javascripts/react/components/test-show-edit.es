import Question from "./_test-show-edit/question.es";

import TestQuestion from "./../stores/_question.es";

class TestShowEdit extends React.Component {

  render() {
    const question = new TestQuestion();

    return (
      <div id="test-show-edit">
        <Question question={question} />
      </div>
    );
  }

}

export default TestShowEdit;
