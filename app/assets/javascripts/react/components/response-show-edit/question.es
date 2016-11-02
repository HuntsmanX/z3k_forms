import { observer } from "mobx-react";
import QuestionEditor from "./question-editor.es";

@observer
class Question extends React.Component {

  render() {
    const { question, index } = this.props;

    return (
      <div className="question">
        <div className="index">{index + 1}</div>
        <QuestionEditor question={question}/>
      </div>
    );
  }

}

export default Question;
