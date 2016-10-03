import { observer } from "mobx-react";

class ShowSingleChoice extends React.Component {

  render() {
    const { question } = this.props;

    return (
      <div className="row">
        <div className="large-4 columns">
          {question.options.map((option, index) => {
            return (
              <label key={index}>
                <input type="radio" checked={option.isCorrect} onChange={() => {}} />
                {option.content}
              </label>
            );
          })}
        </div>
      </div>
    );
  }

}

export default ShowSingleChoice;
