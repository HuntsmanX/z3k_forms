import { observer } from "mobx-react";

import QuestionsList from "../response-show-edit/questions-list.es";

@observer
class Section extends React.Component {
  render() {
    return (
      <div className="section">
        <div>
          <QuestionsList section={this.props.section}/>
        </div>
      </div>
    );
  }
}

export default Section;
