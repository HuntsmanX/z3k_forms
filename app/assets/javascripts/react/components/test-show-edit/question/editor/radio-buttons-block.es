import { observer } from "mobx-react";

@observer
class RadioButtonsBlock extends React.Component {

  onChange(optionIndex, event) {
    if (this.props.blockProps.question.isBeingEdited) {
      const { field } = this.props.blockProps;
      const selected = field.options.find(option => option.content === event.target.value);
      field.toggleCorrectOption(selected.uuid);
    }
  }

  render() {
    const { field } = this.props.blockProps;

    return (
      <div>
        {field.options.map((option, index) => {
          return (
            <label key={option.uuid}>
              <input type="radio" name={field.uuid} checked={option.is_correct} onChange={this.onChange.bind(this, index)}/>
              {option.content}
            </label>
          );
        })}
      </div>
    );
  }

}

export default RadioButtonsBlock;
