import { observer } from "mobx-react";

@observer
class RadioButtonsBlock extends React.Component {

  onChange(uuid, event) {
    const { field } = this.props.blockProps;
    const selected = field.options.find(option => option.uuid === uuid);
    field.toggleCorrectOption(selected.uuid);
  }

  render() {
    const { field } = this.props.blockProps;
    return (
      <div>
        {field.options.map((option, index) => {
          return (
            <label key={option.uuid}>
              <input type="radio" name={field.uuid} checked={option.user_selected} onChange={this.onChange.bind(this, option.uuid)}/>
              {option.content}
            </label>
          );
        })}
      </div>
    );
  }

}

export default RadioButtonsBlock;
