import { observer } from "mobx-react";

@observer
class DropdownBlock extends React.Component {

  onFocus = (event) => {
    this.props.blockProps.onStartEdit();
  }

  onBlur = (event) => {
    this.props.blockProps.onStopEdit();
  }

  onChange = (event) => {
    if (this.props.blockProps.question.isBeingEdited) {
      const { field } = this.props.blockProps;
      const selected = field.options.find(option => option.content === event.target.value);
      field.toggleCorrectOption(selected.uuid);
    }
  }

  render() {
    const { field } = this.props.blockProps;
    const correctOption = field.options.find(option => option.is_correct);
    const value = correctOption ? correctOption.content : "";

    return (
      <select
        value={value}
        onChange={this.onChange}
        onFocus={this.onFocus}
        onBlur={this.onBlur}
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
