import { observer } from "mobx-react";

@observer
class TextAreaBlock extends React.Component {

  render() {
    const { field, valueKey, onChange, onFocus, onBlur, placeholder } = this.props.blockProps;
    
    return (
      <textarea
        value={field[valueKey]}
        onChange={onChange}
        onFocus={onFocus}
        onBlur={onBlur}
        placeholder={placeholder}
      />
    );
  }

}

export default TextAreaBlock;
