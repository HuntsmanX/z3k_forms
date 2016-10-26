import { observable, action, computed } from "mobx";
import { EditorState, RichUtils, Entity, AtomicBlockUtils, convertToRaw, convertFromRaw, ContentState, Modifier, SelectionState } from "draft-js";

class ResponseFieldEditor {
  @observable state = EditorState.createEmpty();

  constructor(content) {
    this.state    = this.state;
  }

  @action update = (value) => {
    this.state = value;
  }

  @action onTab(e) {
    const maxDepth = 4;
    this.onChange(RichUtils.onTab(e, this.state.editorState, maxDepth));
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
export default ResponseFieldEditor;
