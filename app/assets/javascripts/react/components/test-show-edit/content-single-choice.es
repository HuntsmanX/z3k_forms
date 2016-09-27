import { observer } from "mobx-react";

@observer
class ContentSingleChoice extends React.Component {

  render() {
    const { question } = this.props;

    return (
      <div className="content">
        <div dangerouslySetInnerHTML={{ __html: question.htmlContent }} className="question-content" />
        <div className="large-4 answer-fields">
          {question.options.map((option, index) => {
            return (
              <label key={index}>
                <input type="radio" name="single-choice"/>
                {option.content}
              </label>
            );
          })}
        </div>
      </div>
    );
  }

}

export default ContentSingleChoice;
