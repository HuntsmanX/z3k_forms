import StyleButton from "./style-button.es";

const BLOCK_TYPES = [
  { label: 'H1',    style: 'header-one' },
  { label: 'H2',    style: 'header-two' },
  { label: 'H3',    style: 'header-three' },
  { label: 'H4',    style: 'header-four' },
  { label: 'Quote', style: 'blockquote' },
  { label: 'UL',    style: 'unordered-list-item' },
  { label: 'OL',    style: 'ordered-list-item' },
  { label: 'Code',  style: 'code-block' }
];

const BlockTypeControls = (props) => {
  const { editorState } = props;
  const selection = editorState.getSelection();
  const blockType = editorState
    .getCurrentContent()
    .getBlockForKey(selection.getStartKey())
    .getType();

  return (
    <div className="draft-controls">
      {BLOCK_TYPES.map(type =>
        <StyleButton
          key={type.label}
          active={type.style === blockType}
          label={type.label}
          onToggle={props.onToggle}
          style={type.style}
        />
      )}
    </div>
  )
}

export default BlockTypeControls;
