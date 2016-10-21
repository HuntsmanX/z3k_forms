import { observer } from "mobx-react";

import QuestionEditor       from "../test-show-edit/question/question-editor.es";
import Controls             from "../test-show-edit/question/controls.es";

@observer
class Question extends React.Component {
  assignEditorRef(ref) {
    this.props.question.assignEditorRef(ref);
  }

render() {
  const { question } = this.props;

  return (
    <QuestionEditor question={question} ref={(ref) => this.assignEditorRef(ref)} />
  )

}

}

export default Question;
