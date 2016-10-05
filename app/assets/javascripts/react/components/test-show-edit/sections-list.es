import { observer } from "mobx-react";

import Section from "./section.es";

@observer
class SectionsList extends React.Component {

  addSection() {
    this.props.test.addSection();
  }

  deleteSection(index) {
    this.props.test.deleteSection(index);
  }

  render() {
    const { test } = this.props;

    return (
      <div>
        <div className="sections-list">
          {test.sections.length ? (
            test.sections.map((section, index) => {
              return <Section
                key={section.uuid}
                index={index}
                section={section}
                deleteSection={this.deleteSection.bind(this, index)}
                move={test.moveSection.bind(test)}
              />;
            })
          ) : (
            <p>No sections yet</p>
          )}
        </div>
        <div className="clearfix">
          <div className="float-right">
            <a onClick={this.addSection.bind(this)} className="btn-add">Add Section</a>
          </div>
        </div>
      </div>
    );
  }

}

export default SectionsList;
