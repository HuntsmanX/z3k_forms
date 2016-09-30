import {observer} from "mobx-react";
import LabeledWrapper from "./labeled-wrapper.es";

@observer
class SectionForm extends React.Component {

  change(attr, event) {
    this.props.section.change(attr, event.target.value);
  }

  render() {
    const section = this.props.section;

    return (
      <form className="edit-section-form">
        <LabeledWrapper label="Section Title">
          <div className="large-6 columns">
            <input value={section.title} onChange={this.change.bind(this, "title")}/>
          </div>
        </LabeledWrapper>

        <LabeledWrapper label="Set Time">
          <div className="large-6 columns">
            <input value={section.time} onChange={this.change.bind(this, "time")}/>
          </div>
        </LabeledWrapper>

        <footer className="clearfix">
          <div className="float-right">
            <button className="button tiny" onClick={section.handleClick.bind(this, section)}>Save</button>
          </div>
        </footer>
      </form>
    )

  }

}
export default SectionForm;