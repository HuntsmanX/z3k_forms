import { observer } from "mobx-react";

@observer
class RadioButtonsBlock extends React.Component {

  onChange(optionIndex, event) {
    if (this.props.blockProps.question.isBeingEdited) {
      this.props.blockProps.field.options.forEach(option => {
        option.change('is_correct', false);
      });
      const option = this.props.blockProps.field.options[optionIndex];
      option.change('is_correct', true);
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
