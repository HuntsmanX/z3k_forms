import { observer } from "mobx-react";

@observer
class InlineTextInputBlock extends React.Component {

  render() {
    const { field, valueKey, onChange, onFocus, onBlur, placeholder } = this.props.blockProps;

    return (
      <input
        type="text"
        value={field[valueKey]}
        onChange={onChange}
        onFocus={onFocus}
        onBlur={onBlur}
        placeholder={placeholder}
      />
    );
  }

}

export default InlineTextInputBlock;
