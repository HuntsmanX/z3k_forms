import { observer } from "mobx-react";

import InsertControls from "./controls/insert-controls.es";
import StyleControls  from "./controls/style-controls.es";

@observer
class Controls extends React.Component {

  render() {
    const { question } = this.props;
    const { editor }   = question;

    return (
      <div className="clearfix question-controls">
        <div className="controls float-left">
          <InsertControls
            questionType={question.type}
            onToggle={question.insertField}
          />
        </div>

        <div className="controls float-right">
          <StyleControls
            editorState={editor.state}
            onBlockToggle={editor.toggleBlockType}
            onInlineToggle={editor.toggleInlineStyle}
          />
        </div>
      </div>
    );
  }

}

export default Controls;
