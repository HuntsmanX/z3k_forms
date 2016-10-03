import { observer } from "mobx-react";
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';

import Option from "./option.es";

@DragDropContext(HTML5Backend)
@observer
class EditOptions extends React.Component {

  deleteOption(index) {
    this.props.question.deleteOption(index);
  }

  render() {
    const { question } = this.props;

    return (
      <div className="row">
        <div className="large-5 columns">
          {question.options.map((option, index) => {
            return <Option
              key={option.uuid}
              index={index}
              option={option}
              hasCorrectOptions={question.hasCorrectOptions}
              deleteOption={this.deleteOption.bind(this, index)}
              move={question.moveOption.bind(question)}
            />
          })}
        </div>
      </div>
    );
  }

}

export default EditOptions;
