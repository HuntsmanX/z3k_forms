import { observer } from "mobx-react";

@observer
class ContentShortAnswer extends React.Component {

  render() {
    const { question } = this.props;

    return (
      <div className="content">
        <div dangerouslySetInnerHTML={{ __html: question.htmlContent }} className="question-content" />
        <div className="large-4 answer-fields">
          <input type="text" placeholder="Answer text"/>
        </div>
      </div>
    );
  }

}

export default ContentShortAnswer;
