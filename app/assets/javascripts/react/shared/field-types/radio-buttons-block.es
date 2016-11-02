import { observer } from "mobx-react";

@observer
class RadioButtonsBlock extends React.Component {

  render() {
    const { field, valueKey, onChange } = this.props.blockProps;

    return (
      <div>
        {field.options.map(option => {
          return (
            <label key={option.uuid}>
              <input
                type="radio"
                name={field.uuid}
                value={option.uuid}
                checked={option[valueKey]}
                onChange={onChange}
              />
              {option.content}
            </label>
          );
        })}
      </div>
    );
  }

}

export default RadioButtonsBlock;
