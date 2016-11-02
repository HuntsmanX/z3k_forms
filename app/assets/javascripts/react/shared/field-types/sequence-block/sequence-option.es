import { observer } from "mobx-react";
import { dragSource, dropTarget } from "./option-dnd.es";

@dropTarget
@dragSource
@observer
class SequenceOption extends React.Component {

  render() {
    const { uuid, content } = this.props;
    const { connectDragSource, connectDragPreview, isDragging, connectDropTarget } = this.props;
    const opacity = isDragging ? 0 : 1;

    return connectDropTarget(
      connectDragPreview(
        <label className="sequence-option" style={{ opacity }}>
          {connectDragSource(
            <i className="material-icons">dehaze</i>
          )}
          {content}
        </label>
      )
    );
  }

}

export default SequenceOption;
