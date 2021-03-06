import { observer } from "mobx-react";

import OptionsList from "./options-list.es";
import Hash          from "../test-show-edit/hash.es";


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

  onChange = (attr, event) => {
    this.props.field.change(attr, event.target.value)
  }

  toggleCheckk = () => {
    const { field } = this.props;
    field.change('checked', !field.checked);
  }

  render() {
    const { index, field } = this.props;
    const autocheckIcon = field.autocheck ? 'done' : 'block';
    return (
      <div className="field-controls">
        <div className="row">

          <div className="large-2 columns">
            {`${index + 1}. `}
            <span
              data-uuid={field.uuid}
              data-tooltip
              className="has-tip"
              tabIndex={field.uuid}
              title={field.tooltip}
            >
              {field.prettyName}
            </span>
          </div>

          {field.field_type == 'text_input' || field.field_type == 'text_area' || field.field_type == 'inline_text_input' ? (
            <div className="large-2 columns">
              <span className="control-label">Correct Answer: </span>
              <span> {field.content} </span>
            </div>
          ) : (
              null
          )}

          <div className="large-2 columns">
            <span className="control-label">User Score</span>
            <input type="text" className="score-input" value={field.user_score} onChange={this.onChange.bind(null, 'user_score')} />
          </div>

          <Hash k='Checked'
            v={field.checked ? (
              <i className="material-icons action" onClick={this.toggleCheckk}>done</i>
              ) : (
              <i className="material-icons action" onClick={this.toggleCheckk}>block</i>
            )} />

          <div className="large-6 columns">
            {field.hasOptions ? <OptionsList field={field} key={field.uuid} /> : null}
          </div>

        </div>
      </div>
    );
  }

}

export default FieldsControls;
