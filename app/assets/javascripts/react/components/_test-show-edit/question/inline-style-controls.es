import StyleButton from "./style-button.es";

const INLINE_STYLES = [
  { icon: 'format_bold',       value: 'BOLD',      title: 'Bold' },
  { icon: 'format_italic',     value: 'ITALIC',    title: 'Italic' },
  { icon: 'format_underlined', value: 'UNDERLINE', title: 'Underlined' },
  { icon: 'code',              value: 'CODE',      title: 'Code' }
];

const InlineStyleControls = (props) => {
  const currentStyle = props.editorState.getCurrentInlineStyle();

  return (
    <div className="editor-control-group">
      <span className="group-title">Inline styles</span>
      {INLINE_STYLES.map(type =>
        <StyleButton
          key={type.icon}
          active={currentStyle.has(type.value)}
          icon={type.icon}
          iconTitle={type.title}
          onToggle={props.onToggle}
          value={type.value}
        />
      )}
    </div>
  );
};

export default InlineStyleControls;
