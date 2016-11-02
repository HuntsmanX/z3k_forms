import { observer } from "mobx-react";

@observer
class InlineDropdownBlock extends React.Component {

  render() {
    const { field, valueKey, onChange, onFocus, onBlur } = this.props.blockProps;

    const selected = field.options.find(o => o[valueKey]);
    const value    = selected ? selected.uuid : "";

    return (
      <div className="inline-dropdown-wrapper">
        <select
          value={value}
          onChange={onChange}
          onFocus={onFocus}
          onBlur={onBlur}
        >
          {field.options.map(option => {
            return <option key={option.uuid} value={option.uuid}>{option.content}</option>;
          })}
        </select>
      </div>
    );
  }

}

export default InlineDropdownBlock;
