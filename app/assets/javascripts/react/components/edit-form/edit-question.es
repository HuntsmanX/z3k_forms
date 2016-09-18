import { observer } from "mobx-react";

import LoadingWrapper         from "./../loading-wrapper.es";
import Draft                  from "./../draft.es";
import FormFieldWrapper       from "./form-field-wrapper.es";
import SingleChoiceOptions    from "./single-choice-options.es";
import MultipleChoiceOptions  from "./multiple-choice-options.es";

@observer
class EditQuestion extends React.Component {

  onChange(attr, event) {
    this.props.question.change(
      attr, event.target && event.target.value || event
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

        <div className="callout primary">
          <form onSubmit={this.onSubmit.bind(this)}>

            <fieldset>
              <legend>Question</legend>

              <FormFieldWrapper label="Content">
                <Draft value={question.content} onChange={this.onChange.bind(this, 'content')}/>
              </FormFieldWrapper>

              <FormFieldWrapper label="Type">
                <select
                  onChange={this.onChange.bind(this, 'question_type')}
                  value={question.question_type}
                >
                  {questionTypes.map(type => {
                    return (
                      <option value={type.value} key={type.value}>
                        {type.name}
                      </option>
                    );
                  })}
                </select>
              </FormFieldWrapper>
            </fieldset>

            {question.question_type === 'single_choice' ? (
              <SingleChoiceOptions question={question} />
            ) : null}

            {question.question_type === 'multiple_choice' ? (
              <MultipleChoiceOptions />
            ) : null}

            <footer className="clearfix">
              <div className="float-right">
                <button type="submit"className="button small">
                  Save
                </button>
              </div>
            </footer>

          </form>
        </div>
      </li>
    );
  }

}

export default EditQuestion;
