import { observer } from "mobx-react";

import QuestionEditor from "./question/question-editor.es";
import Controls       from "./question/controls.es";
import FieldsControls from "./question/fields-controls.es";

import Loader         from "./loader.es";
import Hash           from "./hash.es";

import { dragSource, dropTarget } from "./question-dnd.es";

@dropTarget
@dragSource
@observer
class Question extends React.Component {

  render() {
    const { question, deleteQuestion } = this.props;

    const { connectDragSource, connectDragPreview, isDragging, connectDropTarget } = this.props;
    const opacity = isDragging ? 0 : 1;

    const className = question.edited ? 'edited' : '';

    return connectDropTarget(
      <div className={`question ${className}`} style={{ opacity, position: 'relative' }}>
        {question.isBeingSaved ? <Loader /> : null}

        <div className="actions left">
          {question.persisted ? (
            connectDragSource(
              <i className="material-icons action drag-handle">dehaze</i>
            )
          ) : null}
        </div>

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
          <i
            className="material-icons action alert"
            onClick={deleteQuestion}
            title="Delete"
          >delete</i>
        </div>

        {connectDragPreview(
          <div className="main-content">
            <QuestionEditor question={question} ref={question.assignEditorRef} />

            {question.errors.length ? (
              <div className="errors">{question.errors.join("\n")}</div>
            ) : null}

            {question.isBeingEdited ? null : (
              <div className="question-stats">
                <div className="row">
                  <Hash k='Max Score' v={question.score} />
                  <Hash k='Auto' v={question.autoScore} />
                  <Hash k='Manually' v={question.manualScore} />
                  <Hash k='' v='' />
                </div>
              </div>
            )}

            {question.isBeingEdited ? <Controls question={question} /> : null}

            {question.isBeingEdited && question.fields.length ? <FieldsControls question={question} /> : null}
          </div>
        )}
      </div>
    );
  }

}

export default Question;
