import { observer } from "mobx-react";

@observer
class ContentSequence extends React.Component {

  render() {
    const { question } = this.props;

    return (
      <div className="content">
        <div dangerouslySetInnerHTML={{ __html: question.htmlContent }} className="question-content" />
        <div className="large-4 answer-fields">
          {question.options.map((option, index) => {
            return (
              <div key={option.uuid} className="graggable-option">
                <span className="handle">
                  <i className="fa fa-bars" title="Drag"></i>
                </span>
                {option.content}
              </div>
            );
          })}
        </div>
      </div>
    );
  }

}

export default ContentSequence;
