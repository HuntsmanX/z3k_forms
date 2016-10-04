import { observer } from "mobx-react";

import LabeledWrapper from "./labeled-wrapper.es";

@observer
class SectionForm extends React.Component {

  change(attr, event) {
    this.props.section.change(attr, event.target.value);
  }

  saveSection(event) {
    event.preventDefault();
    this.props.section.save();
  }

  render() {
    const { section } = this.props;

    return (
      <div className="row">
        <div className="large-12 columns">
          <div className="callout primary">
            <form className="edit-section-form" onSubmit={this.saveSection.bind(this)}>

              <fieldset>
                <legend>Edit Section</legend>

                <LabeledWrapper label="Title">
                  <div className="large-6 columns">
                    <input type="text" value={section.title} onChange={this.change.bind(this, "title")}/>
                  </div>
                </LabeledWrapper>

                <LabeledWrapper label="Description">
                  <div className="large-6 columns">
                    <textarea value={section.paragraph} onChange={this.change.bind(this, "paragraph")}/>
                  </div>
                </LabeledWrapper>

                <LabeledWrapper label="Time Limit">
                  <div className="large-6 columns">
                    <input type="number" value={section.time} onChange={this.change.bind(this, "time")}/>
                  </div>
                </LabeledWrapper>
              </fieldset>

              <footer className="clearfix">
                <div className="float-right">
                  <button className="button tiny">Save</button>
                </div>
              </footer>
            </form>
          </div>
        </div>
      </div>
    );
  }

}
export default SectionForm;
