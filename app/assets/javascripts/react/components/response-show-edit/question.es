import { observer } from "mobx-react";

import { DragSource, DropTarget } from 'react-dnd';
import { findDOMNode } from 'react-dom';

import QuestionEditor       from "../test-show-edit/question/question-editor.es";
import Controls             from "../test-show-edit/question/controls.es";
import FieldsControls       from "../test-show-edit/question/fields-controls.es";

import Loader               from "../test-show-edit/loader.es";

@observer
    class Question extends React.Component {

    assignEditorRef(ref) {
        this.props.question.assignEditorRef(ref);
    }

    render() {
        const { question } = this.props;

      return (
          <QuestionEditor question={question} ref={(ref) => this.assignEditorRef(ref)} />
      )

    }

}

export default Question;
