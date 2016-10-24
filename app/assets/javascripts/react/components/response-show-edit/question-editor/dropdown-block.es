import { observer } from "mobx-react";

@observer
class DropdownBlock extends React.Component {

  onChange = (event) => {
      const { field } = this.props.blockProps;
      const selected = field.options.find(option => option.content === event.target.value);
      field.toggleCorrectOption(selected.uuid);
  }

  render() {
    const { field } = this.props.blockProps;
    return (
      <select
        onChange={this.onChange}
        placeholder="Correct answer"
      >
        {field.options.map(option => {
          return <option key={option.uuid} value={option.content}>{option.content}</option>;
        })}
      </select>
    );
  }

}

export default DropdownBlock;
