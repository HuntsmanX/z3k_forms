import { observer } from "mobx-react";
import Section from "./section.es";

@observer
class SectionsList extends React.Component {

  renderSections = () => {
    const { test } = this.props;

    return test.sections.map((section, index) => {
      return <Section
        key={section.uuid}
        index={index}
        section={section}
        move={test.moveSection}
      />;
    });
  }

  render() {
    const { test } = this.props;

    return (
      <div>
        <div className="sections-list">
          {test.sections.length ? (
            this.renderSections()
          ) : (
            <p>No sections yet</p>
          )}
        </div>
      </div>
    );
  }

}

export default SectionsList;
