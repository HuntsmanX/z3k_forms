import {observer} from "mobx-react";

import SectionEdit from "./section-edit.es";
import SectionForm from "./section-form.es";
import Question from "./question.es";

@observer
class Section extends React.Component {

  toggle() {
    this.props.section.toggle();
  }

  render() {
    const {section} = this.props;

    return (
      <div className="section">
        <div className="clearfix">
          <div className="actions float-right">

            {section.isExpanded ? (
              <i className="material-icons action" title="Collapse" onClick={this.toggle.bind(this)}>expand_less</i>
            ) : (
              <i className="material-icons action" title="Expand" onClick={this.toggle.bind(this)}>expand_more</i>
            )}

          </div>

          <h1>{section.title}</h1>

          <div className="row">
            <div className="large-5 columns">
                    <span className="counter-item">
                      Questions: <em>{section.questions.length}</em>
                    </span>
              <span className="counter-item">
                      Time limit: <em>{section.time}</em>
                    </span>
            </div>
            <div className="large-7 columns">
              {section.isExpanded ? <SectionEdit section={section}/> : null}
            </div>
          </div>

          <div className="row">
            <div className="large-12 columns">
              {section.isShown && section.isExpanded ? (<SectionForm section={section}/>) : null}
            </div>
          </div>

          {section.isExpanded ? (
            <div className="row">
              <div className="large-1 columns"></div>
              <div className="large-11 columns questions-list">
                {section.questions.map(function (question, idx) {
                  return <Question question={question} key={idx}/>;
                })}
              </div>
            </div>
          ) : null }

        </div>
      </div>

    )
  }
}

export default Section;
