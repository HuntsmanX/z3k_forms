import { observer } from "mobx-react";

import { dragSource, dropTarget } from "./option-dnd.es";

@dropTarget
@dragSource
@observer
class Option extends React.Component {

  onChange = (attr, event) => {
    this.props.option.change(attr, event.target.value);
  }

  handleKeyDown = (event) => {
    if (event.which === 13 || event.keyCode === 13) {
      this.props.onEnterPress();
    }
  }

  render() {
    const { option, deleteOption, index, hasCorrectOptions, toggleCorrect } = this.props;
    const { connectDragSource, connectDragPreview, isDragging, connectDropTarget } = this.props;
    const opacity = isDragging ? 0 : 1;

    const icon = option.is_correct ? 'done' : 'block';

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
              onChange={this.onChange.bind(null, 'content')}
              onKeyDown={this.handleKeyDown}
              placeholder={`Option ${index + 1}`}
              ref={option.assignInputRef}
            />
          </div>
        )}

        <div className="large-3 columns">
          <label className="middle">
            {hasCorrectOptions ? (
              <i className="material-icons action" onClick={toggleCorrect}>{icon}</i>
            ) : null}
            <i className="material-icons action" onClick={deleteOption}>delete</i>
          </label>
        </div>

      </div>
    );
  }

}

export default Option;
