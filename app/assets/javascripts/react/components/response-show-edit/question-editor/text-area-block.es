import { observer } from "mobx-react";

@observer
class TextAreaBlock extends React.Component {

  onChange = (event) => {
    this.props.blockProps.field.change(
      'user_content', event.target.value
    );
  }

  render() {
    const { content } = this.props.blockProps.field;
    return (
      <textarea
        value={content}
        onChange={this.onChange}
        placeholder="Input answer"
      />
    );
  }

}

export default TextAreaBlock;
