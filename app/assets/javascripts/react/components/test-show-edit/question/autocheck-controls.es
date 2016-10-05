import StyleButton from "./style-button.es";

const AutocheckControls = (props) => {
  const { autocheck, onToggle } = props;
  const icon  = autocheck ? 'done' : 'block';
  const title = autocheck ? 'Checked Automatically' : 'Checked Manually';

  return (
    <div className="editor-control-group">
      <span className="group-title">Autocheck</span>
      <StyleButton
        key={icon}
        icon={icon}
        iconTitle={title}
        onToggle={onToggle}
      />
    </div>
  );
}

export default AutocheckControls;
