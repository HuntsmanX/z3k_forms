import { observer } from "mobx-react";

import OptionsList from "./options-list.es";

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

  componentDidMount() {
    new Foundation.Tooltip($(`[data-uuid='${this.props.field.uuid}']`));
  }

  componentWillUnmount() {
    $(`[data-uuid='${this.props.field.uuid}']`).foundation('destroy');
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

          <div className="large-2 columns">
            <span className="control-label">Autocheck</span>
            <i className="material-icons control-icon" onClick={field.toggleAutocheck}>{autocheckIcon}</i>
          </div>

          <div className="large-2 columns">
            <span className="control-label">Max Score</span>
            <input type="text" className="score-input" value={field.score} onChange={this.onChange.bind(null, 'score')} />
          </div>

          <div className="large-6 columns">
            {field.hasOptions ? <OptionsList field={field} key={field.uuid} /> : null}
          </div>

        </div>

        {field.errors.length ? (
          <div className="errors">{field.errors.join("\n")}</div>
        ) : null}
      </div>
    );
  }

}

export default FieldsControls;
