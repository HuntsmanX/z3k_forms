import { observer } from "mobx-react";

import LoadingWrapper         from "./../loading-wrapper.es"
import SingleChoiceOptions    from "./single-choice-options.es";
import MultipleChoiceOptions  from "./multiple-choice-options.es";

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
    const { question, questionTypes } = this.props;

    return (
      <li className="question">
        {question.isBeingSaved ? <LoadingWrapper /> : null}

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
            <div className="columns large-3">
              <label className="text-right middle">Type</label>
            </div>

            <div className="columns large-6">
              <select
                onChange={this.onChange.bind(this, 'question_type')}
                value={question.question_type}
              >
                {questionTypes.map(type => {
                  return <option
                    value={type.value}
                    key={type.value}
                  >
                    {type.name}
                  </option>
                })}
              </select>
            </div>

            <div className="columns large-3" />
          </div>

          {question.question_type === 'single_choice' ? (
            <SingleChoiceOptions question={question} />
          ) : null}

          {question.question_type === 'multiple_choice' ? (
            <MultipleChoiceOptions />
          ) : null}

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
