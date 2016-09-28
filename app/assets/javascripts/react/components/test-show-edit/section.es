import { observer } from "mobx-react";

import SectionEdit from "./section-edit.es";

@observer
  class Section extends React.Component {

  toggle() {
    this.props.section.toggle();
  }

 render() {

  const { section } = this.props;
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

        <h1>{section.title} - {section.questions.length} questions</h1>
      </div>

        {section.isExpanded ? (
          <SectionEdit section={section} />
        ) : null}
    </div>
  )
  }
}

export default Section;
