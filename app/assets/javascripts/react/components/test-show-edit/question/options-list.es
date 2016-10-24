import { observer } from "mobx-react";

import Option from "./option.es";

@observer
class OptionsList extends React.Component {

  addOption = (event) => {
    event && event.preventDefault();
    this.props.field.addOption();
  }

  render() {
    const { field } = this.props;

    return (
      <div>
        {field.options.map((option, index) => {
          return <Option
            key={option.uuid}
            option={option}
            index={index}
            deleteOption={field.deleteOption.bind(null, option.uuid)}
            move={field.moveOption}
            onEnterPress={this.addOption}
            hasCorrectOptions={field.hasCorrectOptions}
            toggleCorrect={field.toggleCorrectOption.bind(null, option.uuid)}
          />
        })}
        <a href="#" onClick={this.addOption}>Add Option</a>
      </div>
    );
  }

}

export default OptionsList;
