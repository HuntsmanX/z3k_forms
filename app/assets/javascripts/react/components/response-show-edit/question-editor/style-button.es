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
    const { active, icon, iconTitle } = this.props;
    let className = 'styleButton';
    if (active) className += '-active';
  
    return (
      <span className={className} onMouseDown={this.onToggle}>
        <i className="material-icons" title={iconTitle}>{icon}</i>
        {this.props.label}
      </span>
    );
  }
}
export default StyleButton;
