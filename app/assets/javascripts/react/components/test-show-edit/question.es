import { observer } from "mobx-react";

import { DragSource, DropTarget } from 'react-dnd';
import { findDOMNode } from 'react-dom';

import QuestionEditor       from "./question/question-editor.es";
import Controls             from "./question/controls.es";
import FieldsControls       from "./question/fields-controls.es";

const dragSource = {
  beginDrag(props) {
    return {
      index: props.index
    };
  }
};

const dragTarget = {
  hover(props, monitor, component) {
    const dragIndex = monitor.getItem().index;
    const hoverIndex = props.index;

    // Don't replace items with themselves
    if (dragIndex === hoverIndex) return;

    // Determine rectangle on screen
    const hoverBoundingRect = findDOMNode(component).getBoundingClientRect();

    // Get vertical middle
    const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;

    // Determine mouse position
    const clientOffset = monitor.getClientOffset();

    // Get pixels to the top
    const hoverClientY = clientOffset.y - hoverBoundingRect.top;

    // Only perform the move when the mouse has crossed half of the items height
    // When dragging downwards, only move when the cursor is below 50%
    // When dragging upwards, only move when the cursor is above 50%

    // Dragging downwards
    if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) return;

    // Dragging upwards
    if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) return;

    // Time to actually perform the action
    props.move(dragIndex, hoverIndex);

    // Note: we're mutating the monitor item here!
    // Generally it's better to avoid mutations,
    // but it's good here for the sake of performance
    // to avoid expensive index searches.
    monitor.getItem().index = hoverIndex;
  }
};

@DropTarget('question', dragTarget, connect => ({
  connectDropTarget: connect.dropTarget()
}))
@DragSource('question', dragSource, (connect, monitor) => ({
  connectDragSource:  connect.dragSource(),
  connectDragPreview: connect.dragPreview(),
  isDragging:         monitor.isDragging()
}))
@observer
class Question extends React.Component {

  editQuestion(value) {
    this.props.question.edit(value);
    if (value) this.refs.editor.focus();
  }

  saveQuestion() {
    event.preventDefault();
    this.props.question.save();
  }

  render() {
    const { question, deleteQuestion } = this.props;

    const { connectDragSource, connectDragPreview, isDragging, connectDropTarget } = this.props;
    const opacity = isDragging ? 0 : 1;

    return connectDropTarget(
      <div className="question" style={{ opacity }}>
        <div className="actions left">
          {connectDragSource(
            <i className="material-icons action drag-handle">dehaze</i>
          )}
        </div>

        <div className="actions right">
          {question.isBeingEdited ? (
            <i
              className="material-icons action primary"
              onClick={this.saveQuestion.bind(this)}
              title="Save"
            >save</i>
          ) : (
            <i
              className="material-icons action primary"
              onClick={this.editQuestion.bind(this, true)}
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
            <QuestionEditor question={question} ref="editor" />

            {question.isBeingEdited ? <Controls question={question} /> : null}

            {question.isBeingEdited && question.fields.length ? <FieldsControls question={question} /> : null}
          </div>
        )}
      </div>
    );
  }

}

export default Question;
