import { observer } from "mobx-react";

class ShowSequence extends React.Component {

  render() {
    const { question } = this.props;

    return (
      <div className="row">
        <div className="large-4 columns">
          {question.options.map((option, index) => {
            return (
              <div key={option.uuid} className="graggable-option">
                <span className="handle">
                  <i className="material-icons" title="Drag">dehaze</i>
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

export default ShowSequence;
