import { observer } from "mobx-react";

@observer
class TextEditorBlock extends React.Component {

  render() {
    const { content } = this.props.blockProps.field;

    return (
      <textarea
        placeholder="Text Editor"
        disabled
      />
    );
  }

}

export default TextEditorBlock;
