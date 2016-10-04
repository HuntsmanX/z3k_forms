import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';

import Test from "./../stores/test.es";
import SectionsList from "./test-show-edit/sections-list.es";

@DragDropContext(HTML5Backend)
class TestShowEdit extends React.Component {

  constructor () {
    super();
    this.test = new Test();
  }

  render() {
    const test = new Test();

    return (
      <div id="test-show-edit">
        <SectionsList test={test}/>
      </div>
    );
  }

}

export default TestShowEdit;
