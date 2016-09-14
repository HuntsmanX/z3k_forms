import { observer } from "mobx-react";

@observer
class EditQuestion extends React.Component {

  onChange(attr, event) {
    this.props.question.change(
      attr, event.target.value
    );
  }

  onSubmit(event) {
    event.preventDefault();
    this.props.question.save();
  }

  render() {
    const { question } = this.props;

    return (
      <li className="question">
        <form onSubmit={this.onSubmit.bind(this)}>

          <div className="row">
            <div className="columns large-3">
              <label className="text-right middle">Content</label>
            </div>

            <div className="columns large-6">
              <textarea value={question.content} onChange={this.onChange.bind(this, 'content')}/>
            </div>

            <div className="columns large-3" />
          </div>

          <div className="row">
            <div className="columns large-9 large-offset-3">
              <button
                type="submit"
                className="button small"
              >
                Save
              </button>
            </div>
          </div>

        </form>
      </li>
    );
  }

}

export default EditQuestion;
