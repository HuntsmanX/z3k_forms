import ResponseSection from './../stores/response/response-section.es';
import Section from './response-show-edit/section.es'
import { DragDropContext } from "react-dnd";
import HTML5Backend        from "react-dnd-html5-backend";

@DragDropContext(HTML5Backend)
class ResponseShowEdit extends React.Component{

  constructor(props) {
    super(props);
    this.section = new ResponseSection(props.section);
  }

  render() {
    return(
      <div id="response-show-edit">
        <Section section={this.section}/>
        <a className="button small" onClick={this.section.update}>Submit</a>
      </div>
    )
  }
}
export default ResponseShowEdit;
