import Section from "./test-show-edit/section.es";

import TestSection from "./../stores/test-section.es";

class TestShowEdit extends React.Component {

  render() {
    const section = new TestSection();

    return (
      <div id="test-show-edit">
        <Section section={section}/>
      </div>
    )
  }

}

export default TestShowEdit;
