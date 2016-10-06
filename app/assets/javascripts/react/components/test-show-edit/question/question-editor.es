import { observer } from "mobx-react";
import { Editor, DefaultDraftBlockRenderMap, Entity } from "draft-js";
import { Map } from 'immutable';

const styleMap = {
  'CODE': {
    color:      '#0a0a0a',
    fontFamily: 'Consolas, "Liberation Mono", Courier, monospace',
    fontWeight: 'normal',
    background: '#e6e6e6',
    border:     '1px solid #cacaca',
    padding:    '0.14706rem 0.36765rem 0.07353rem'
  }
};

@observer
class QuestionEditor extends React.Component {

  focus() {
    this.refs.editor.focus();
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

  onChange(value) {
    this.props.question.change('editorState', value);
  }

  handleKeyCommand(command) {
    this.props.question.handleKeyCommand(command);
  }

  handleReturn(event) {
    const { editorState } = this.props.question;
    const blockKey  = editorState.getSelection().getFocusKey();
    const blockType = editorState.getCurrentContent().getBlockForKey(blockKey).getType();

    if (['code-block', 'unordered-list-item', 'ordered-list-item'].indexOf(blockType) + 1) {
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
      <Editor
        blockRendererFn={this.blockRenderer.bind(this)}
        blockRenderMap={blockRenderMap}
        customStyleMap={styleMap}
        editorState={question.editorState}
        onChange={this.onChange.bind(this)}
        handleKeyCommand={this.handleKeyCommand.bind(this)}
        readOnly={question.readOnly}
        handleReturn={this.handleReturn.bind(this)}
        ref="editor"
      />
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

export default QuestionEditor;
