import { observer } from "mobx-react";

import InsertControls       from "./controls/insert-controls.es";
import QuestionTypeControls from "./controls/question-type-controls.es";
import AutocheckControls    from "./controls/autocheck-controls.es";
import ScoreControls        from "./controls/score-controls.es";
import BlockTypeControls    from "./controls/block-type-controls.es";
import InlineStyleControls  from "./controls/inline-style-controls.es";

@observer
class Controls extends React.Component {

  onTypeChange(value) {
    this.props.question.change('type', value);
  }

  insertOption(type) {
    const { question } = this.props;

    switch(type) {
      case 'gap':
        question.insertGapBlock();
        return;
      case 'option':
        question.addOption();
        return;
    }
  }

  toggleAutocheck() {
    this.props.question.change(
      'autocheck', !this.props.question.autocheck
    );
  }

  changeScore(event) {
    this.props.question.change(
      'score', event.target.value
    );
  }

  toggleBlockType(blockType) {
    this.props.question.toggleBlockType(blockType);
  }

  toggleInlineStyle(style) {
    this.props.question.toggleInlineStyle(style);
  }

  render() {
    const { question } = this.props;

    return (
      <div>
        <div className="controls float-left">
          <QuestionTypeControls
            questionType={question.type}
            onToggle={this.onTypeChange.bind(this)}
          />

          <InsertControls
            questionType={question.type}
            onToggle={this.insertOption.bind(this)}
          />

          <AutocheckControls
            autocheck={question.autocheck}
            onToggle={this.toggleAutocheck.bind(this)}
          />

          <ScoreControls
            value={question.score}
            onChange={this.changeScore.bind(this)}
          />
        </div>

        <div className="controls float-right">
          <BlockTypeControls
            editorState={question.editorState}
            onToggle={this.toggleBlockType.bind(this)}
          />

          <InlineStyleControls
            editorState={question.editorState}
            onToggle={this.toggleInlineStyle.bind(this)}
          />
        </div>
      </div>
    );
  }

}

export default Controls;
