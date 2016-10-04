import { observer } from "mobx-react";

import Option from "./option.es";

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
