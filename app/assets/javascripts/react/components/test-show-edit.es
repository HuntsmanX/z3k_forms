import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';

import Section from "./test-show-edit/section.es";

import TestSection from "./../stores/test-section.es";

@DragDropContext(HTML5Backend)
class TestShowEdit extends React.Component {

  render() {
    const section = new TestSection();

    return (
      <div id="test-show-edit">
        <Section section={section}/>
      </div>
    );
  }

}

export default TestShowEdit;
