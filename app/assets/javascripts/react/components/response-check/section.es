import { observer } from "mobx-react";

import QuestionsList from "../response-show-edit/questions-list.es";

@observer
class Section extends React.Component {
  render() {
    const section = this.props;
    const expanded  = section.isBeingEdited || section.isExpanded;
    return (
      <div className="section">
        <div className="actions right">
        {section.persisted ? (
            section.isExpanded ? (
              <i className="material-icons action" title="Collapse" onClick={section.toggle}>expand_less</i>
            ) : (
              <i className="material-icons action" title="Expand" onClick={section.toggle}>expand_more</i>
            )
          ) : null}
        </div>
      </div>
    );
  }
}

export default Section;
