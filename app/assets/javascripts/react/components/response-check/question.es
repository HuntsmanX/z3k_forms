import { observer } from "mobx-react";

import QuestionEditor from "../response-show-edit/question-editor.es";
import Hash          from "../test-show-edit/hash.es";
import FieldsControls from "./fields-controls.es";

@observer
class Question extends React.Component {
  render(){
    const { question, index } = this.props;
    const className = question.edited ? 'edited' : '';
    return (
        <div className={`question ${className}`}>
        <div className="index">{index + 1}</div>
        <QuestionEditor question={question}/>

          <div className="actions right">
            {question.isBeingEdited ? (
              <i
                className="material-icons action primary"
                onClick={question.save}
                title="Save"
              >save</i>
            ) : (
              <i
                className="material-icons action primary"
                onClick={question.edit.bind(null, true)}
                title="Edit"
              >mode_edit</i>
            )}
          </div>

          <div className="question-stats">
            <div className="row">
              <Hash k='Max Score'  v={question.score} />
              <Hash k='Autocheck'  v={String(question.autocheck)} />
              <Hash k='User Score' v={question.user_score} />
              <Hash k='Checked'    v={String(question.checked)} />
              <Hash k='' v='' />
            </div>
          </div>

          {question.isBeingEdited && question.fields.length ? <FieldsControls question={question} /> : null}
      </div>
    );
  }
}
export default Question;
