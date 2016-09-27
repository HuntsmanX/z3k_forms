import { observer } from "mobx-react";

@observer
class ContentParagraph extends React.Component {

  render() {
    const { question } = this.props;

    return (
      <div className="content">
        <div dangerouslySetInnerHTML={{ __html: question.htmlContent }} className="question-content" />
        <div className="large-4 answer-fields">
          <textarea placeholder="Answer text" />
        </div>
      </div>
    );
  }

}

export default ContentParagraph;
