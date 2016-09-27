import { observer } from "mobx-react";
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';

import LabeledWrapper from "./labeled-wrapper.es";
import Option         from "./option.es"

@DragDropContext(HTML5Backend)
@observer
class EditSingleChoice extends React.Component {

  change(attr, event) {
    this.props.question.change(attr, event.target.value);
  }

  changeAutoCheck(event) {
    this.props.question.change(
      'autoCheck', !this.props.question.autoCheck
    );
  }

  addOption(event) {
    event.preventDefault();
    this.props.question.addOption();
  }

  deleteOption(index) {
    this.props.question.deleteOption(index);
  }

  render() {
    const { question } = this.props;

    return (
      <div>
        <LabeledWrapper label="Checked Automatically">
          <div className="large-6 columns">
            <div className="switch tiny">
              <input className="switch-input" id="tinySwitch" type="checkbox" checked={question.autoCheck} onChange={this.changeAutoCheck.bind(this)} />
              <label className="switch-paddle" htmlFor="tinySwitch" />
            </div>
          </div>
        </LabeledWrapper>

        {question.options.map((option, index) => {
          return <Option
            option={option}
            key={option.uuid}
            index={index}
            deleteOption={this.deleteOption.bind(this, index)}
            hasCorrectOptions={question.autoCheck}
            move={question.moveOption.bind(question)}
          />
        })}

        <LabeledWrapper label={`${question.options.length + 1}.`}>
          <div className="large-6 columns">
            <label className="middle">
              <a onClick={this.addOption.bind(this)}>Add Option</a>
            </label>
          </div>
        </LabeledWrapper>
      </div>
    );
  }

}

export default EditSingleChoice;
