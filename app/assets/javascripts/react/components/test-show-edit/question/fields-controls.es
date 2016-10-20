import { observer } from "mobx-react";

import Option from "./option.es";

@observer
class FieldsControls extends React.Component {

  render() {
    const { fields } = this.props.question;

    return (
      <div className="fields-controls">
        {fields.map((field, index) => {
          return <FieldControls key={field.uuid} index={index} field={field} />;
        })}
      </div>
    );
  }

}

@observer
class FieldControls extends React.Component {

  toggleAutocheck() {
    this.props.field.toggleAutocheck();
  }

  onChange(attr, event) {
    this.props.field.change(attr, event.target.value)
  }

  render() {
    const { index, field } = this.props;

    return (
      <div className="field-controls">
        <div className="row">
          <div className="large-2 columns">
            {`${index + 1}. ${field.prettyName}`}
          </div>
          <div className="large-2 columns">
            <span className="control-label">Autocheck</span>
            {field.autocheck ? (
              <i className="material-icons control-icon" onClick={this.toggleAutocheck.bind(this)}>done</i>
            ) : (
              <i className="material-icons control-icon" onClick={this.toggleAutocheck.bind(this)}>block</i>
            )}
          </div>
          <div className="large-2 columns">
            <span className="control-label">Max Score</span>
            <input type="text" className="score-input" value={field.score} onChange={this.onChange.bind(this, 'score')} />
          </div>
          <div className="large-6 columns">
            {['dropdown', 'checkboxes', 'radio_buttons', 'sequence'].indexOf(field.type) + 1 ? (
              <OptionsList  field={field} key={field.uuid} />
            ) : null}
          </div>
        </div>

        {field.errors.length ? (
          <div className="errors">{field.errors.join("\n")}</div>
        ) : null}
      </div>
    );
  }

}

@observer
class OptionsList extends React.Component {

  addOption(event) {
    event && event.preventDefault();
    this.props.field.addOption();
  }

  render() {
    const { field } = this.props;

    return (
      <div>
        {field.options.map((option, index) => {
          return <Option
            key={option.uuid}
            option={option}
            index={index}
            deleteOption={field.deleteOption.bind(field, option.uuid)}
            move={field.moveOption.bind(field)}
            onEnterPress={this.addOption.bind(this)}
            field={field}
            hasCorrectOptions={field.hasCorrectOptions}
          />
        })}
        <a href="#" onClick={this.addOption.bind(this)}>Add Option</a>
      </div>
    );
  }

}

export default FieldsControls;
