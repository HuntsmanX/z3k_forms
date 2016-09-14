import { observer } from "mobx-react";

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
      <div>
        <div className="row">
          <div className="large-3 columns">
            <label className="text-right middle">Options</label>
          </div>

          <div className="columns large-6">
            {question.options.map((option, index) => {
              return <Option option={option} deleteOption={this.deleteOption.bind(this, index)} key={option.uuid} />
            })}

            <button
              type="button"
              className="button small"
              onClick={this.addOption.bind(this)}
            >
              Add Option
            </button>
          </div>

          <div className="large-3 columns" />
        </div>
      </div>
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
    const { option, deleteOption } = this.props;

    return (
      <div className="input-group">
        <input type="text" className="input-group-field" value={option.content} onChange={this.onChange.bind(this, 'content')} />
        <div className="input-group-button">
          <input type="button" className="button alert" value="Delete" onClick={deleteOption}/>
        </div>
      </div>
    )
  }

}

export default SingleChoiceOptions;
