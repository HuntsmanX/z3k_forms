import { observer } from "mobx-react";

import LabeledWrapper from "./labeled-wrapper.es";
import Loader         from "./loader.es";

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
      <div className="row edit-form">
        <div className="large-12 columns">
          <div className="callout primary" style={{ position: 'relative' }}>
            {section.isBeingSaved ? <Loader /> : null}

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
                    <textarea value={section.description} onChange={this.change.bind(this, "description")}/>
                  </div>
                </LabeledWrapper>

                <LabeledWrapper label="Time Limit">
                  <div className="large-6 columns">
                    <input type="number" value={section.time_limit} onChange={this.change.bind(this, "time_limit")}/>
                  </div>
                </LabeledWrapper>

                <LabeledWrapper label="Required Score">
                  <div className="large-6 columns">
                    <input type="number" value={section.required_score} onChange={this.change.bind(this, "required_score")}/>
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
