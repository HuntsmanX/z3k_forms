import { observer } from "mobx-react";

import Option from "./option.es";

@observer
class OptionsList extends React.Component {

  render() {
    const { field } = this.props;
    return (
      <div>
        {field.options.map((option, index) => {
          return <Option
            key={option.uuid}
            option={option}
            index={index}
            hasCorrectOptions={field.hasCorrectOptions}
          />
        })}
      </div>
    );
  }

}

export default OptionsList;
