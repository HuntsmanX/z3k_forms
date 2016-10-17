import StyleButton from "./style-button.es";

const INSERT_TYPES = [
  {
    icon:  'short_text',
    value: 'text_input',
    title: 'Text Input'
  }, {
    icon:  'subject',
    value: 'text_area',
    title: 'Text Area'
  }, {
    icon:  'arrow_drop_down_circle',
    value: 'dropdown',
    title: 'Dropdown'
  }, {
    icon:  'check_box',
    value: 'checkboxes',
    title: 'Checkboxes'
  }, {
    icon:  'radio_button_checked',
    value: 'radio_buttons',
    title: 'Radio Buttons'
  }, {
    icon:  'sort',
    value: 'sequence',
    title: 'Sequence'
  }, {
    icon:  'format_color_text',
    value: 'text_editor',
    title: 'Text Editor'
  }
]

const InsertControls = (props) => {
  return (
    <div className="editor-control-group">
      <span className="group-title">Insert</span>
      {INSERT_TYPES.map(type =>
        <StyleButton
          key={type.icon}
          icon={type.icon}
          iconTitle={type.title}
          onToggle={props.onToggle}
          value={type.value}
        />
      )}
    </div>
  );
}

export default InsertControls;
