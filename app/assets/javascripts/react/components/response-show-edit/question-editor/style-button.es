import { observer } from "mobx-react";
import {Editor, EditorState, RichUtils} from 'draft-js';

@observer
class StyleButton extends React.Component {
  constructor() {
    super();
    this.onToggle = (e) => {
      e.preventDefault();
      this.props.onToggle(this.props.style);
    };
  }

  render() {
    return (
      <span className='styleButton' onMouseDown={this.onToggle}>
        {this.props.label}
      </span>
    );
  }
}
export default StyleButton;
