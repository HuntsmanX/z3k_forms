import { observer } from "mobx-react";

import QuestionsList from "../response-show-edit/questions-list.es";

@observer
class Section extends React.Component {
  render() {
    return (
      <div className="section">
        <div>
          <h1>Section {this.props.section.title}</h1>
          <h1>It has {this.props.section.questions.length} questions </h1>
          <QuestionsList section={this.props.section}/>
        </div>
      </div>
    );
  }
}

export default Section;
