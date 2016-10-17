import { observer } from "mobx-react";

import InsertControls       from "./controls/insert-controls.es";
import BlockTypeControls    from "./controls/block-type-controls.es";
import InlineStyleControls  from "./controls/inline-style-controls.es";

@observer
class Controls extends React.Component {

  insertField(type) {
    this.props.question.insertField(type);
  }

  toggleBlockType(blockType) {
    this.props.question.toggleBlockType(blockType);
  }

  toggleInlineStyle(style) {
    this.props.question.toggleInlineStyle(style);
  }

  render() {
    const { question } = this.props;

    return (
      <div className="clearfix question-controls">
        <div className="controls float-left">
          <InsertControls
            questionType={question.type}
            onToggle={this.insertField.bind(this)}
          />
        </div>

        <div className="controls float-right">
          <BlockTypeControls
            editorState={question.editorState}
            onToggle={this.toggleBlockType.bind(this)}
          />

          <InlineStyleControls
            editorState={question.editorState}
            onToggle={this.toggleInlineStyle.bind(this)}
          />
        </div>
      </div>
    );
  }

}

export default Controls;
