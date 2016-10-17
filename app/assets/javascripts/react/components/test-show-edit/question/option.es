import { observer } from "mobx-react";
import { DragSource, DropTarget } from 'react-dnd';
import { findDOMNode } from 'react-dom';

const dragSource = {
  beginDrag(props) {
    return {
      index: props.index,
      uuid:  props.option.uuid
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
    const dragId  = monitor.getItem().uuid;
    const hoverId = props.option.uuid;

    props.move(dragId, hoverId);

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

  onChange(attr, event) {
    this.props.option.change(attr, event.target.value);
  }

  handleKeyDown(event) {
    if (event.which === 13 || event.keyCode === 13) {
      this.props.onEnterPress();
    }
  }

  assignInputRef(input) {
    this.props.option.assignInputRef(input);
  }

  render() {
    const { option, deleteOption, index } = this.props;
    const { connectDragSource, connectDragPreview, isDragging, connectDropTarget } = this.props;
    const opacity = isDragging ? 0 : 1;

    return connectDropTarget(
      <div className="row choice-option" style={{ opacity }}>

        <div className="large-1 columns">
          <label className="middle text-right drag-handle">
            {connectDragSource(<i className="material-icons action drag-handle">dehaze</i>)}
          </label>
        </div>

        {connectDragPreview(
          <div className="large-8 columns">
            <input
              type="text"
              value={option.content}
              onChange={this.onChange.bind(this, 'content')}
              onKeyDown={this.handleKeyDown.bind(this)}
              placeholder={`Option ${index + 1}`}
              ref={(input) => this.assignInputRef(input)}
            />
          </div>
        )}

        <div className="large-3 columns">
          <label className="middle">
            <i className="material-icons action" onClick={deleteOption}>delete</i>
          </label>
        </div>

      </div>
    );
  }

}

export default Option;
