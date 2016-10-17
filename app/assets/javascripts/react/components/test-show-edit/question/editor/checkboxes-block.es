
import { observer } from "mobx-react";

@observer
class CheckboxesBlock extends React.Component {

  onChange(optionIndex, event) {
    if (this.props.blockProps.question.isBeingEdited) {
      const option = this.props.blockProps.field.options[optionIndex];
      option.change(
        'is_correct', !option.is_correct
      );
    }
  }

  render() {
    const { field } = this.props.blockProps;

    return (
      <div>
        {field.options.map((option, index) => {
          return (
            <label key={option.uuid}>
              <input type="checkbox" checked={option.is_correct} onChange={this.onChange.bind(this, index)}/>
              {option.content}
            </label>
          );
        })}
      </div>
    );
  }

}

export default CheckboxesBlock;
