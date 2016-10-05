import { observer } from "mobx-react";

import SectionForm from   "./section-form.es";
import QuestionsList from "./questions-list.es";
import Hash from "./hash.es";

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

@DropTarget('section', dragTarget, connect => ({
  connectDropTarget: connect.dropTarget()
}))
@DragSource('section', dragSource, (connect, monitor) => ({
  connectDragSource:  connect.dragSource(),
  connectDragPreview: connect.dragPreview(),
  isDragging:         monitor.isDragging()
}))
@observer
class Section extends React.Component {

  toggle() {
    this.props.section.toggle();
  }

  editSection() {
    this.props.section.edit();
  }

  render() {
    const { section, deleteSection } = this.props;

    const { connectDragSource, connectDragPreview, isDragging, connectDropTarget } = this.props;
    const opacity = isDragging ? 0 : 1;

    const expanded = section.isBeingEdited || section.isExpanded;

    return connectDropTarget(
      <div className="section" style={{ opacity }}>
        <div className="clearfix">

          <div className="actions left">
            {connectDragSource(
              <i className="material-icons action drag-handle">dehaze</i>
            )}
          </div>

          <div className="actions right">
            {section.isBeingEdited ? null : (
              <i className="material-icons action primary" onClick={this.editSection.bind(this)}>edit</i>
            )}

            <i className="material-icons action alert" onClick={deleteSection}>delete</i>

            {section.isExpanded ? (
              <i className="material-icons action" title="Collapse" onClick={this.toggle.bind(this)}>expand_less</i>
            ) : (
              <i className="material-icons action" title="Expand" onClick={this.toggle.bind(this)}>expand_more</i>
            )}
          </div>
        </div>

        {connectDragPreview(
          <div>
            <div className={`content ${expanded ? 'expanded' : ''}`}>
              <h2 className="title">{section.title}</h2>

              {section.description.length ? (
                <div className="description">{section.description}</div>
              ) : null}

              <div className="attributes">
                <div className="row">
                  <Hash k='Questions' v={section.questions.length} />
                  <Hash k='Time Limit' v={section.timeLabel} />
                  <Hash k='Max Score' v={section.maxScore} />
                  <Hash k='Required Score' v={section.requiredScore} />
                </div>
              </div>
            </div>

            {section.isBeingEdited ? (
              <SectionForm section={section}/>
            ) : null}

            {section.isExpanded ? (
              <QuestionsList section={section}/>
            ) : null}
          </div>
        )}
      </div>
    );
  }
}

export default Section;
