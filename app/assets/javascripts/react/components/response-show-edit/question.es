import { observer } from "mobx-react";

@observer
class Question extends React.Component {

render() {
  const { question } = this.props;

  return (
    <h1>{question.id}</h1>
  )

}

}

export default Question;
