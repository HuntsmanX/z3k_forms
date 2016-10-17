import { observer } from "mobx-react";

@observer
class SequenceBlock extends React.Component {

  render() {
    const { field } = this.props.blockProps;

    return (
      <div>
        {field.options.map((option, index) => {
          return (
            <label key={option.uuid} className="sequence-option">
              <i className="material-icons action">dehaze</i>
              {option.content}
            </label>
          );
        })}
      </div>
    );
  }
}

export default SequenceBlock;
