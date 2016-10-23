import { DragDropContext } from "react-dnd";
import HTML5Backend        from "react-dnd-html5-backend";

import Test         from "./../stores/test.es";
import SectionsList from "./test-show-edit/sections-list.es";

@DragDropContext(HTML5Backend)
class TestShowEdit extends React.Component {

  constructor(props) {
    super(props);
    this.test = new Test(props.test);
  }

  render() {
    return (
      <div id="test-show-edit">
        <SectionsList test={this.test} />
      </div>
    );
  }

}

export default TestShowEdit;
