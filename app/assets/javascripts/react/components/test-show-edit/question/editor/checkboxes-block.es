import { observer } from "mobx-react";

@observer
class CheckboxesBlock extends React.Component {

  onChange(optionIndex, event) {
    // event.preventDefault();
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
              <input type="checkbox" value={option.content} checked={option.is_correct} onChange={this.onChange.bind(this, index)}/>
              {option.content}
            </label>
          );
        })}
      </div>
    );
  }

}

export default CheckboxesBlock;
