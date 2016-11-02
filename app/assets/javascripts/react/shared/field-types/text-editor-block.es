import { observer } from "mobx-react";
import { Editor } from "draft-js";

import Controls from "./text-editor-block/controls.es";

import { styleMap } from "./../draft.es";

@observer
class TextEditorBlock extends React.Component {

  renderBlocker = () => {
    return (
      <div
        className="blocker"
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
        }}
      />
    );
  }

  render() {
    const { field: { editor }, onFocus, onBlur, readOnly } = this.props.blockProps;

    return (
      <div className="text-editor-field">
        {readOnly ? this.renderBlocker() : null}

        <Controls editor={editor} />

        <Editor
          editorState={editor.state}
          onChange={editor.change}
          onFocus={onFocus}
          onBlur={onBlur}
          handleKeyCommand={editor.handleKeyCommand}
          customStyleMap={styleMap}
        />
      </div>
    );
  }

}

export default TextEditorBlock;
