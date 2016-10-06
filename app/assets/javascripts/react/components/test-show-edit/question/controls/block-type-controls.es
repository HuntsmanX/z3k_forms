import StyleButton from "./style-button.es";

const BLOCK_TYPES = [
  { icon: 'format_list_bulleted', value: 'unordered-list-item', title: 'Unordered List' },
  { icon: 'format_list_numbered', value: 'ordered-list-item',   title: 'Ordered List' },
  // { icon: 'format_quote',         value: 'blockquote',          title: 'Quote' },
  { icon: 'code',                 value: 'code-block',          title: 'Code' }
];

const BlockTypeControls = (props) => {
  const { editorState } = props;
  const selection = editorState.getSelection();
  const blockType = editorState
    .getCurrentContent()
    .getBlockForKey(selection.getStartKey())
    .getType();

  return (
    <div className="editor-control-group">
      <span className="group-title">Block styles</span>
      {BLOCK_TYPES.map(type =>
        <StyleButton
          key={type.icon}
          active={type.value === blockType}
          icon={type.icon}
          iconTitle={type.title}
          onToggle={props.onToggle}
          value={type.value}
        />
      )}
    </div>
  );
}

export default BlockTypeControls;
