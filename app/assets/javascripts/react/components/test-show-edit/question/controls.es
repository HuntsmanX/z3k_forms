import { observer } from "mobx-react";

import InsertControls from "./controls/insert-controls.es";
import StyleControls  from "./controls/style-controls.es";

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
          <StyleControls
            editorState={question.editorState}
            onBlockToggle={this.toggleBlockType.bind(this)}
            onInlineToggle={this.toggleInlineStyle.bind(this)}
          />
        </div>
      </div>
    );
  }

}

export default Controls;
