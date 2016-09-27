import { observer } from "mobx-react";
import { DragSource, DropTarget } from 'react-dnd';
import { findDOMNode } from 'react-dom';

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

@DropTarget('option', dragTarget, connect => ({
  connectDropTarget: connect.dropTarget()
}))
@DragSource('option', dragSource, (connect, monitor) => ({
  connectDragSource:  connect.dragSource(),
  connectDragPreview: connect.dragPreview(),
  isDragging:         monitor.isDragging()
}))
@observer
class Option extends React.Component {

  change(attr, event) {
    this.props.option.change(attr, event.target.value);
  }

  toggleCorrect() {
    this.props.option.change(
      'isCorrect', !this.props.option.isCorrect
    );
  }

  render() {
    const { option, index, deleteOption, hasCorrectOptions } = this.props;
    const icon      = option.isCorrect ? 'check'   : 'ban';
    const iconTitle = option.isCorrect ? 'Correct' : 'Incorrect';

    const { connectDragSource, connectDragPreview, isDragging, connectDropTarget } = this.props;
    const opacity = isDragging ? 0 : 1;

    return connectDropTarget(
      <div className="row option-row" style={{ opacity }}>
        <div className="large-3 columns">
          <label className="text-right middle draggable">{`${index + 1}.`}</label>
          <label className="drag-handle-container middle text-right">
            {connectDragSource(<i className="fa fa-bars action drag-handle" title="Drag" />)}
          </label>
        </div>
        <div className="large-9 columns">
          <div className="row">
            <div className="large-6 columns">
              {connectDragPreview(
                <div>
                  <input type="text" value={option.content} onChange={this.change.bind(this, 'content')}/>
                </div>
              )}
            </div>
            <div className="large-6 columns">
              <label className="middle">
                {hasCorrectOptions ? (
                  <i className={`fa fa-${icon} fa-fw action margin`} onClick={this.toggleCorrect.bind(this)} title={iconTitle} />
                ) : null}
                <i className="fa fa-trash action" onClick={deleteOption} title="Delete" />
              </label>
            </div>
          </div>
        </div>
      </div>
    );
  }

}

export default Option;
