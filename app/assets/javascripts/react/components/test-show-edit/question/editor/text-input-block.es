import { observer } from "mobx-react";

@observer
class TextInputBlock extends React.Component {

  onFocus(event) {
    this.props.blockProps.onStartEdit();
  }

  onBlur(event) {
    this.props.blockProps.onStopEdit();
  }

  onChange(event) {
    if (this.props.blockProps.question.isBeingEdited) {
      this.props.blockProps.field.change(
        'content', event.target.value
      );
    }
  }

  render() {
    const { content } = this.props.blockProps.field;
    return (
      <input
        type="text"
        value={content}
        onChange={this.onChange.bind(this)}
        onFocus={this.onFocus.bind(this)}
        onBlur={this.onBlur.bind(this)}
        placeholder="Correct answer"
      />
    );
  }

}

export default TextInputBlock;
