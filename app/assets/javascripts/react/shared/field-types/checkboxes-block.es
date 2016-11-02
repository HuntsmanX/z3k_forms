import { observer } from "mobx-react";

@observer
class CheckboxesBlock extends React.Component {

  render() {
    const { field, valueKey, onChange } = this.props.blockProps;

    return (
      <div>
        {field.options.map(option => {
          return (
            <label key={option.uuid}>
              <input
                type="checkbox"
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

export default CheckboxesBlock;
