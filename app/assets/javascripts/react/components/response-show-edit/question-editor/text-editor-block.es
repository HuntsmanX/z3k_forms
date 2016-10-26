import { observer } from "mobx-react";
import {Editor, EditorState, RichUtils} from 'draft-js';
import BlockStyleEditor  from './block-style-editor.es'
import InlineStyleEditor from './inline-styles.es'

const styleMap = {
  'CODE': {
    color:      '#0a0a0a',
    fontFamily: 'Consolas, "Liberation Mono", Courier, monospace',
    fontWeight: 'normal',
    background: '#e6e6e6',
    border:     '1px solid #cacaca',
    padding:    '0.14706rem 0.36765rem 0.07353rem'
  }
};

@observer
class TextEditorBlock extends React.Component {

    render() {
      const { editor } = this.props.blockProps;

      return (
        <div className="editor-root">
          <BlockStyleEditor
            editorState={editor.state}
            onToggle={editor.toggleBlockType}
            />
          <InlineStyleEditor
            editorState={editor.state}
            onToggle={editor.toggleInlineStyle}
          />
        <div className='editor' onClick={this.focus}>
            <Editor
              customStyleMap={styleMap}
              editorState={editor.state}
              handleKeyCommand={this.handleKeyCommand}
              onChange={editor.update}
              onTab={this.onTab}
              placeholder="Input answer"
              ref="editor"
              spellCheck={true}
            />
          </div>
        </div>
      );
    }
  }
export default TextEditorBlock;
