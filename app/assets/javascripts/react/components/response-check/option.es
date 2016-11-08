import { observer } from "mobx-react";

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

    const icon = option.is_correct ? 'done' : 'block';

    return(
      <div className="row choice-option">

          <div className="large-8 columns">
            <input
              type="text"
              value={option.content}
              onKeyDown={this.handleKeyDown}
              placeholder={`Option ${index + 1}`}
              ref={option.assignInputRef}
            />
          </div>

        <div className="large-3 columns">
          <label className="middle">
            {hasCorrectOptions ? (
              <i className="material-icons action">{icon}</i>
            ) : null}
          </label>
        </div>

      </div>
    );
  }

}

export default Option;
