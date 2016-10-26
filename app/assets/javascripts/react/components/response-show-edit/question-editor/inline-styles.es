import { observer } from "mobx-react";
import {Editor, EditorState, RichUtils} from 'draft-js';
import StyleButton from './style-button.es';


var INLINE_STYLES = [
  {label: 'Bold', style: 'BOLD'},
  {label: 'Italic', style: 'ITALIC'},
  {label: 'Underline', style: 'UNDERLINE'},
];

@observer
class InlineStyleEditor extends React.Component {
  render(){
    const currentStyle = this.props.editorState.getCurrentInlineStyle();
    return (
      <div className="InlineStyleEditor">
        {INLINE_STYLES.map(type =>
          <StyleButton
            key={type.label}
            active={currentStyle.has(type.style)}
            label={type.label}
            onToggle={this.props.onToggle}
            style={type.style}
          />
        )}
      </div>
    );
  }
}
export default InlineStyleEditor;
