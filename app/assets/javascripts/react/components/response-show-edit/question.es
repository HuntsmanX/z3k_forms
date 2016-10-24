import { observer } from "mobx-react";
import QuestionEditor from "./question-editor.es";

@observer
class Question extends React.Component {

render() {
  const { question } = this.props;

  return (
    <div className="main-content">
        <QuestionEditor question={question}/>
    </div>
  )

}

}

export default Question;
