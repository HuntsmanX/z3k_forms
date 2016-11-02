import { observer } from "mobx-react";

import QuestionsList from "../response-show-edit/questions-list.es";
import Hash          from "../test-show-edit/hash.es";

@observer
class Section extends React.Component {
  render() {
    const section = this.props.section;
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
        <div>
          <div className={`content ${expanded ? 'expanded' : ''}`}>
              <h2 className="title">{section.title}</h2>
              <div className="description">{section.description}</div>

            <div className="attributes">
              <div className="row">
                <Hash k='Questions Count' v={section.questions.length} />
              </div>

              <div className="row">
                {section.time_limit > 0 ? (
                  <Hash
                    k='Time Limit'
                    v={section.time_limit}
                  />
                ) : (
                  <Hash width='3' k='' v='' />
                )}
              </div>

              <div className="row">
                {section.required_score > 0 ? (
                  <Hash
                    k='Reuired Scores'
                    v={section.required_score}
                  />
                ) : (
                  <Hash width='3' k='' v='' />
                )}
              </div>
            </div>
          </div>

          {section.isExpanded ? (
            <QuestionsList section={section} />
          ) : null}
        </div>
      </div>
    );
  }
}

export default Section;
