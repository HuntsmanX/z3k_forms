import { observer } from "mobx-react";

@observer
class TextInputBlock extends React.Component {

  onChange = (event) => {
    this.props.blockProps.field.change(
      'user_content', event.target.value
    );
  }

  render() {
    const { user_content } = this.props.blockProps.field;
    return (
      <input
        type="text"
        value={user_content}
        onChange={this.onChange}
        placeholder="Input answer"
      />
    );
  }

}

export default TextInputBlock;
