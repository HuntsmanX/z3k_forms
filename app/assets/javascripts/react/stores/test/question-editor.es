import { observable, action, computed } from "mobx";
import { EditorState, RichUtils, Entity, AtomicBlockUtils, convertToRaw, convertFromRaw, ContentState, Modifier, SelectionState } from "draft-js";

class QuestionEditor {

  @observable state = null;

  constructor(content, onChange) {
    this.state    = this._parseRawContent(content);
    this.onChange = onChange;
  }

  @action update = (value) => {
    if (value.getLastChangeType() === 'backspace-character') {
      this.state = this._handleDelete(value);
    } else {
      this.state = value;
    }
    this.onChange();
  }

  @action handleKeyCommand = (command) => {
    if (command === "backspace") return false;

    const newState = RichUtils.handleKeyCommand(this.state, command);

    if (newState) {
      this.update(newState);
      return true;
    }
    return false;
  }

  @action handleReturn = (event) => {
    const blockKey  = this.state.getSelection().getFocusKey();
    const blockType = this.state.getCurrentContent().getBlockForKey(blockKey).getType();

    if (['code-block', 'unordered-list-item', 'ordered-list-item'].indexOf(blockType) + 1) {
      return 'not-handled';
    } else {
      this.insertEolBlock();
      return 'handled';
    }
  }

  @action toggleBlockType = (blockType) => {
    this.update(
      RichUtils.toggleBlockType(this.state, blockType)
    );
  }

  @action toggleInlineStyle = (style) => {
    this.update(
      RichUtils.toggleInlineStyle(this.state, style)
    );
  }

  @action insertEolBlock = () => {
    const entityKey = Entity.create('eol-block', 'IMMUTABLE');
    this.update(
      AtomicBlockUtils.insertAtomicBlock(this.state, entityKey, ' ')
    );
  }

  @action insertField = (type) => {
    const entityKey = Entity.create(type, 'IMMUTABLE');
    const newState  = AtomicBlockUtils.insertAtomicBlock(this.state, entityKey, ' ');

    this.update(newState);

    const activeBlockKey = newState.getSelection().getFocusKey();
    const fieldBlockKey  = newState.getCurrentContent().getKeyBefore(activeBlockKey);

    return fieldBlockKey;
  }

  serialize = () => {
    return JSON.stringify(
      convertToRaw(this.state.getCurrentContent())
    );
  }

  isBlockPresent(blockKey) {
    return !!this.state.getCurrentContent().getBlockForKey(blockKey);
  }

  _parseRawContent = (content) => {
    try {
      return EditorState.moveSelectionToEnd(
        EditorState.createWithContent(
          convertFromRaw(JSON.parse(content))
        )
      );
    }
    catch(error) {
      return EditorState.moveSelectionToEnd(
        EditorState.createWithContent(
          ContentState.createFromText('Untitled question')
        )
      );
    }
  }

  _handleDelete(value) {
    const blockKey = value.getSelection().getFocusKey();
    const block    = value.getCurrentContent().getBlockForKey(blockKey);

    if (block.getType() !== "atomic") return value;

    const previousBlockKey = value.getCurrentContent().getKeyBefore(blockKey);
    const previousBlock    = value.getCurrentContent().getBlockForKey(previousBlockKey);

    let selection = value.getSelection();
    selection     = selection.set('anchorKey', previousBlockKey);
    selection     = selection.set('anchorOffset', previousBlock.getLength());


    const modifiedContent = Modifier.removeRange(value.getCurrentContent(), selection, 'backward');
    return EditorState.push(this.state, modifiedContent, value.getLastChangeType());
  }

}

export default QuestionEditor;
