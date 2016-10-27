import { observer } from "mobx-react";
import SequenceOption from "./sequence-option.es";

@observer
class SequenceBlock extends React.Component {

  render() {
    const { field } = this.props.blockProps;
    return (
      <div>
        {field.options.map((option, index) => {
          return (
            <SequenceOption
              key={option.uuid}
              uuid={option.uuid}
              content={option.content}
              move={field.moveOption}
              index={index}
            />
          );
        })}
      </div>
    );
  }
}

export default SequenceBlock;
