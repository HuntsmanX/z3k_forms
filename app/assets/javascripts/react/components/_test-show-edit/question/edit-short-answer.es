import { observer } from "mobx-react";

@observer
class EditShortAnswer extends React.Component {

  onChange(event) {
    if (this.props.question.isBeingEdited) {
      this.props.question.change('shortAnswer', event.target.value);
    }
  }

  render() {
    const { question } = this.props;

    return (
      <div className="row">
        <div className="large-4 columns">
          <input
            type="text"
            placeholder="Expected answer"
            value={question.shortAnswer}
            onChange={this.onChange.bind(this)}
          />
        </div>
      </div>
    );
  }

}

export default EditShortAnswer;
