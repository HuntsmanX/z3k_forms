import { observer } from "mobx-react";

@observer
class DropdownBlock extends React.Component {

  onFocus(event) {
    this.props.blockProps.onStartEdit();
  }

  onBlur(event) {
    this.props.blockProps.onStopEdit();
  }

  onChange(event) {
    if (this.props.blockProps.question.isBeingEdited) {
      const { field } = this.props.blockProps;
      field.options.forEach(option => option.change('is_correct', false));
      const selected = field.options.find(option => option.content === event.target.value);
      selected.change('is_correct', true);
    }
  }

  render() {
    const { field } = this.props.blockProps;
    const correctOption = field.options.find(option => option.is_correct);
    const value = correctOption ? correctOption.content : "";
    return (
      <select
        value={value}
        onChange={this.onChange.bind(this)}
        onFocus={this.onFocus.bind(this)}
        onBlur={this.onBlur.bind(this)}
        placeholder="Correct answer"
      >
        {field.options.map(option => {
          return <option key={option.uuid} value={option.content}>{option.content}</option>;
        })}
      </select>
    );
  }

}

export default DropdownBlock;
