import { observer } from "mobx-react";

import FormFieldWrapper from "./form-field-wrapper.es";

@observer
class SingleChoiceOptions extends React.Component {

  addOption(event) {
    this.props.question.addOption();
  }

  deleteOption(index) {
    this.props.question.deleteOption(index);
  }

  render() {
    const { question } = this.props;

    return (
      <fieldset>
        <legend>Single Choice Options</legend>

        {question.options.map((option, index) => {
          return <Option option={option} deleteOption={this.deleteOption.bind(this, index)} key={option.uuid} index={index} />
        })}

        <p>
          <a onClick={this.addOption.bind(this)}>Add Option</a>
        </p>
      </fieldset>
    )
  }

}

@observer
class Option extends React.Component {

  onChange(attr, event) {
    this.props.option.change(
      attr, event.target.value
    );
  }

  render() {
    const { option, deleteOption, index } = this.props;

    return (
      <div className="row">
        <div className="columns large-3">
          <label className="middle text-right">{`Option ${index + 1}`}</label>
        </div>
        <div className="columns large-9">
          <div className="columns large-6">
            <input type="text" value={option.content} onChange={this.onChange.bind(this, 'content')} />
          </div>
          <div className="columns large-2">
            <label className="middle">
              <input type="checkbox" />
              Correct
            </label>
          </div>
          <div className="columns large-4">
            <button className="button tiny alert" style={{ marginTop: '3.5px' }}>Delete</button>
          </div>
        </div>
      </div>
    )
  }

}

export default SingleChoiceOptions;
