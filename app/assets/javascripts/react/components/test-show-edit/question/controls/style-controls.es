import StyleButton from "./style-button.es";

const INLINE_STYLES = [
  { icon: 'format_bold',       value: 'BOLD',      title: 'Bold' },
  { icon: 'format_italic',     value: 'ITALIC',    title: 'Italic' },
  { icon: 'format_underlined', value: 'UNDERLINE', title: 'Underlined' },
  { icon: 'code',              value: 'CODE',      title: 'Code' }
];

const BLOCK_TYPES = [
  { icon: 'format_list_bulleted', value: 'unordered-list-item', title: 'Unordered List' },
  { icon: 'format_list_numbered', value: 'ordered-list-item',   title: 'Ordered List' },
  // { icon: 'format_quote',         value: 'blockquote',          title: 'Quote' },
  { icon: 'code',                 value: 'code-block',          title: 'Code' }
];

const StyleControls = (props) => {

  const { editorState } = props;
  const selection = editorState.getSelection();
  const blockType = editorState
    .getCurrentContent()
    .getBlockForKey(selection.getStartKey())
    .getType();

  const currentStyle = editorState.getCurrentInlineStyle();

  return (
    <div className="editor-control-group">
      <span className="group-title">Styles</span>
      {BLOCK_TYPES.map(type =>
        <StyleButton
          key={type.icon}
          active={type.value === blockType}
          icon={type.icon}
          iconTitle={type.title}
          onToggle={props.onBlockToggle}
          value={type.value}
        />
      )}
      &nbsp;&nbsp;|&nbsp;&nbsp;
      {INLINE_STYLES.map(type =>
        <StyleButton
          key={type.icon}
          active={currentStyle.has(type.value)}
          icon={type.icon}
          iconTitle={type.title}
          onToggle={props.onInlineToggle}
          value={type.value}
        />
      )}
    </div>
  );

}

export default StyleControls;
