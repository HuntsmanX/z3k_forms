import Response         from "./../stores/response.es";
import SectionsList from "./response-check/section-list.es";

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
