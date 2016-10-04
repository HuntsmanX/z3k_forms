import { observer } from "mobx-react";

import SectionForm from   "./section-form.es";
import QuestionsList from "./questions-list.es";

@observer
class Section extends React.Component {

  toggle() {
    this.props.section.toggle();
  }

  editSection() {
    this.props.section.edit();
  }

  render() {
    const { section } = this.props;

    return (
      <div className="section">
        <div className="clearfix">

          <div className="actions float-right">
            {section.isBeingEdited ? null : (
              <i className="material-icons action" onClick={this.editSection.bind(this)}>edit</i>
            )}

            {section.isExpanded ? (
              <i className="material-icons action" title="Collapse" onClick={this.toggle.bind(this)}>expand_less</i>
            ) : (
              <i className="material-icons action" title="Expand" onClick={this.toggle.bind(this)}>expand_more</i>
            )}
          </div>

          <h2>{section.title}</h2>

          <div className="row">
            <div className="large-5 columns">
              <span className="counter-item">
                Questions: <em>{section.questions.length}</em>
              </span>
              <span className="counter-item">
                Time limit: <em>{section.time}</em>
              </span>
            </div>
          </div>

          {section.isBeingEdited ? (
            <SectionForm section={section} />
          ) : null}

          {section.isExpanded ? (
            <QuestionsList section={section} />
          ) : null}

        </div>
      </div>

    );
  }
}

export default Section;
