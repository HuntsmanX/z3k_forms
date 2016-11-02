import Response         from "./../stores/response.es";
import SectionsList from "./response-check/section-list.es";
import { DragDropContext } from "react-dnd";
import HTML5Backend        from "react-dnd-html5-backend";

@DragDropContext(HTML5Backend)
class Responsecheck extends React.Component {

  constructor(props) {
    super(props);
    this.test = new Response(props.test);
  }

  render() {
    return (
      <div id="test-show-edit">
        <SectionsList test={this.test} />
      </div>
    );
  }

}

export default Responsecheck;
