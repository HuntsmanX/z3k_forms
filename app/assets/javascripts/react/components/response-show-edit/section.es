import { observer } from "mobx-react";

import QuestionsList from "../response-show-edit/questions-list.es";

@observer
class Section extends React.Component {

  render() {
    const { section } = this.props;

    return (
      <div>
        <div className="section-description">{section.description}</div>
        <QuestionsList section={section} />
      </div>
    );
  }

}

export default Section;
