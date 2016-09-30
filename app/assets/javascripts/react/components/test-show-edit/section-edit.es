import {observer} from "mobx-react";

@observer
class SectionEdit extends React.Component {

  addQuestion() {
    this.props.section.addQuestion();
  }

  showEdit() {
    this.props.section.showEdit()
  }


  render() {

    return (
      <div className="section-edit float-right">
        <a href="#" onClick={this.showEdit.bind(this)}>
          <i className="material-icons">edit</i>
        </a>
        <a href="#" onClick={this.addQuestion.bind(this)}>
          <i className="material-icons">add</i>
        </a>
      </div>
    );

  }

}
export default SectionEdit;