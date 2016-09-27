import { observer } from "mobx-react";

import QuestionEdit from "./question-edit.es";

import ContentShortAnswer    from "./content-short-answer.es";
import ContentParagraph      from "./content-paragraph.es";
import ContentSingleChoice   from "./content-single-choice.es";
import ContentMultipleChoice from "./content-multiple-choice.es";
import ContentSequence       from "./content-sequence.es";
import ContentGaps           from "./content-gaps.es";

@observer
class Question extends React.Component {

  toggle() {
    this.props.question.toggle();
  }

  renderContent() {
    const question = this.props.question;

    switch(question.type) {
      case 'short_answer':
        return <ContentShortAnswer question={question} />;
      case 'paragraph':
        return <ContentParagraph question={question} />;
      case 'single_choice':
        return <ContentSingleChoice question={question} />;
      case 'multiple_choice':
        return <ContentMultipleChoice question={question} />;
      case 'sequence':
        return <ContentSequence question={question} />;
      case 'gaps':
        return <ContentGaps question={question} />;
    }
  }

  render() {
    const { question } = this.props;

    return (
      <div className="question">
        <div className="clearfix">
          <div className="actions float-right">
            {question.isExpanded ? (
              <i className="material-icons action" title="Collapse" onClick={this.toggle.bind(this)}>expand_less</i>
            ) : (
              <i className="material-icons action" title="Expand" onClick={this.toggle.bind(this)}>expand_more</i>
            )}
          </div>

          {this.renderContent()}
        </div>

        {question.isExpanded ? (
          <QuestionEdit question={question} />
        ) : null}
      </div>
    );
  }

}

export default Question;
