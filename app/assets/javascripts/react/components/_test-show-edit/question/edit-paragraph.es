import { observer } from "mobx-react";

@observer
class EditParagraph extends React.Component {

  onChange(event) {
    if (this.props.question.isBeingEdited) {
      this.props.question.change('paragraph', event.target.value);
    }
  }

  render() {
    const { question } = this.props;

    return (
      <div className="row">
        <div className="large-4 columns">
          <textarea
            placeholder="Expected answer"
            value={question.paragraph}
            onChange={this.onChange.bind(this)}
          />
        </div>
      </div>
    );
  }

}

export default EditParagraph;
