class ShowQuestion extends React.Component {

  editQuestion(event) {
    this.props.question.edit();
  }

  render() {
    const { question } = this.props;

    return (
      <li className="question">
        <div className="content">
          {question.content}
        </div>
        <div>
          {`Type: ${question.question_type}`}
        </div>

        <div className="on-hover">
          <button
            type="button"
            className="button small"
            onClick={this.editQuestion.bind(this)}
          >
            Edit
          </button>
        </div>
      </li>
    );
  }

}

export default ShowQuestion;
