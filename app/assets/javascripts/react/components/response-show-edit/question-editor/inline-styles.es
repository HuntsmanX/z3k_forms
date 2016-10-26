import { observer } from "mobx-react";
import {Editor, EditorState, RichUtils} from 'draft-js';
import StyleButton from './style-button.es';


var INLINE_STYLES = [
  { icon: 'format_bold',       value: 'BOLD',      title: 'Bold' },
  { icon: 'format_italic',     value: 'ITALIC',    title: 'Italic' },
  { icon: 'format_underlined', value: 'UNDERLINE', title: 'Underlined' },
];

@observer
class InlineStyleEditor extends React.Component {
  render(){
    const {editorState} = this.props;
    const selection = editorState.getSelection();
    const blockType = editorState
          .getCurrentContent()
          .getBlockForKey(selection.getStartKey())
          .getType();
                   
    return (
      <div className="InlineStyleEditor">
        {INLINE_STYLES.map(type =>
          <StyleButton
            key={type.icon}
            active={type.style === blockType}
            icon={type.icon}
            iconTitle={type.title}
            label={type.label}
            onToggle={this.props.onToggle}
            style={type.value}
          />
        )}
      </div>
    );
  }
}
export default InlineStyleEditor;
