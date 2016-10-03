import { observer } from "mobx-react";
import { Editor, DefaultDraftBlockRenderMap, Entity } from "draft-js";
import { Map } from 'immutable';

import EditShortAnswer      from "./question/edit-short-answer.es";
import EditParagraph        from "./question/edit-paragraph.es";
import EditOptions          from "./question/edit-options.es";

import ShowSingleChoice     from "./question/show-single-choice.es";
import ShowMultipleChoice   from "./question/show-multiple-choice.es";
import ShowSequence         from "./question/show-sequence.es"

import InsertControls       from "./question/insert-controls.es";
import QuestionTypeControls from "./question/question-type-controls.es";
import BlockTypeControls    from "./question/block-type-controls.es";
import InlineStyleControls  from "./question/inline-style-controls.es";

@observer
class Question extends React.Component {

  onChange(attr, value) {
    this.props.question.change(attr, value);
  }

  handleKeyCommand(command) {
    this.props.question.handleKeyCommand(command);
  }

  toggleBlockType(blockType) {
    this.props.question.toggleBlockType(blockType);
  }

  toggleInlineStyle(style) {
    this.props.question.toggleInlineStyle(style);
  }

  editQuestion(value) {
    this.props.question.edit(value);
    if (value) this.refs.editor.focus();
  }

  insertOption(type) {
    const { question } = this.props;

    switch(type) {
      case 'gap':    question.insertGapBlock();
      case 'option': question.addOption();
    }
  }

  blockRenderer(block) {
    if (block.getType() === 'atomic') {
      const entityType = Entity.get(block.getEntityAt(0)).getType();

      switch(entityType) {
        case 'gap-block':
          const gapOption = this.props.question.gaps.find(gap => {
            return gap.blockKey === block.getKey();
          });

          return {
            component: GapBlock,
            editable:  false,
            props: {
              atomicBlockType: 'gap-block',
              gapOption:       gapOption,
              question:        this.props.question,
              onStartEdit:     () => {
                this.props.question.change('gapActive', true);
              },
              onStopEdit:      () => {
                this.props.question.change('gapActive', false);
              }
            }
          };
        case 'eol-block':
          return {
            component: EolBlock,
            editable:  false,
            props: {
              atomicBlockType: 'eol-block',
            }
          }
      }
    }
  }

  handleReturn(event) {
    const { editorState } = this.props.question;
    const blockKey  = editorState.getSelection().getFocusKey();
    const blockType = editorState.getCurrentContent().getBlockForKey(blockKey).getType();
    if (blockType === 'unordered-list-item' || blockType === 'ordered-list-item') {
      return 'not-handled';
    } else {
      this.props.question.insertEolBlock();
      return 'handled';
    }
  }

  render() {
    const { question } = this.props;

    const blockRenderMap = DefaultDraftBlockRenderMap.merge(Map({
      'atomic': {
        element: 'div',
        wrapper: <AtomicBlockWrapper />
      }
    }));

    return (
      <div className={`question ${question.isBeingEdited ? 'edit-mode' : ''}`}>
        <div className="actions-left">
          <i className="material-icons action">dehaze</i>
        </div>

        <div className="actions-right">
          {question.isBeingEdited ? (
            <i
              className="material-icons action"
              onClick={this.editQuestion.bind(this, false)}
              title="Save"
            >save</i>
          ) : (
            <i
              className="material-icons action"
              onClick={this.editQuestion.bind(this, true)}
              title="Edit"
            >mode_edit</i>
          )}
        </div>

        <div className="main-content">
          <div className="draft-editor">
            <Editor
              blockRendererFn={this.blockRenderer.bind(this)}
              blockRenderMap={blockRenderMap}
              editorState={question.editorState}
              onChange={this.onChange.bind(this, 'editorState')}
              handleKeyCommand={this.handleKeyCommand.bind(this)}
              readOnly={question.readOnly}
              handleReturn={this.handleReturn.bind(this)}
              ref="editor"
            />
          </div>

          {question.isBeingEdited ? (
            <div className="clearfix">
              <div className="edit-answer-options">
                {question.type === 'short_answer' ? (
                  <EditShortAnswer question={question} />
                ) : null}

                {question.type === 'paragraph' ? (
                  <EditParagraph question={question} />
                ) : null}

                {['single_choice', 'multiple_choice', 'sequence'].indexOf(question.type) + 1 ? (
                  <EditOptions question={question} />
                ) : null}
              </div>

              <div className="controls float-left">
                <QuestionTypeControls
                  questionType={question.type}
                  onToggle={this.onChange.bind(this, 'type')}
                />

                <InsertControls
                  questionType={question.type}
                  onToggle={this.insertOption.bind(this)}
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
          ) : (
            <div className="edit-answer-options">
              {question.type === 'short_answer' ? (
                <EditShortAnswer question={question} />
              ) : null}

              {question.type === 'paragraph' ? (
                <EditParagraph question={question} />
              ) : null}

              {question.type === 'single_choice' ? (
                <ShowSingleChoice question={question} />
              ) : null}

              {question.type === 'multiple_choice' ? (
                <ShowMultipleChoice question={question} />
              ) : null}

              {question.type === 'sequence' ? (
                <ShowSequence question={question} />
              ) : null}
            </div>
          )}
        </div>
      </div>
    );
  }

}

class AtomicBlockWrapper extends React.Component {

  render() {
    const type = this.props.children[0].props.children.props.blockProps.atomicBlockType;

    switch(type) {
      case 'gap-block':
        return this.props.children[0];
      case 'eol-block':
        return <br data-offset-key={this.props['data-offset-key']} />
    }
  }

}

@observer
class GapBlock extends React.Component {

  onFocus(event) {
    this.props.blockProps.onStartEdit();
  }

  onBlur(event) {
    this.props.blockProps.onStopEdit();
  }

  onChange(event) {
    if (this.props.blockProps.question.isBeingEdited) {
      this.props.blockProps.gapOption.change(
        'content', event.target.value
      );
    }
  }

  render() {
    const { content } = this.props.blockProps.gapOption;
    return (
      <input
        type="text"
        value={content}
        onChange={this.onChange.bind(this)}
        onFocus={this.onFocus.bind(this)}
        onBlur={this.onBlur.bind(this)}
        placeholder="Correct answer"
      />
    );
  }

}

class EolBlock extends React.Component {

  render() {
    return <br />;
  }

}

export default Question;
