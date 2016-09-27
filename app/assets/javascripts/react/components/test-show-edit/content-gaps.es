import { observer } from "mobx-react";

@observer
class ContentGaps extends React.Component {

  render() {
    const { question } = this.props;

    return (
      <div className="content">
        <div dangerouslySetInnerHTML={{ __html: question.htmlContent }} className="question-content" />
      </div>
    );
  }

}

export default ContentGaps;
