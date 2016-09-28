import { observer } from "mobx-react";

import LabeledWrapper from "./labeled-wrapper.es";
import Question from "./question.es";
import SectionForm from "./section-form.es"

@observer
class SectionEdit extends React.Component {

  addQuestion() {
    this.props.section.addQuestion();
  }

  showEdit() {
    this.props.section.showEdit()
  }


  render() {
    const { section } = this.props;

    return (
      <div className="callout primary section-edit">
        <a href="#" className="button tiny"
          onClick={this.showEdit.bind(this)} >
          Edit Section
        </a>

        {section.isShown ? (
          <SectionForm section={section}/>
        ) : null}
      </div>
  );
  }
  }
export default SectionEdit;