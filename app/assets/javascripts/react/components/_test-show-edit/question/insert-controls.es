import StyleButton from "./style-button.es";

const INSERT_TYPES = {
  single_choice: [
    {
      icon:  'radio_button_unchecked',
      value: 'option',
      title: 'Single Choice Option'
    }
  ],
  multiple_choice: [
    {
      icon:  'check_box_outline_blank',
      value: 'option',
      title: 'Multiple Choice Option'
    }
  ],
  sequence: [
    {
      icon:  'dehaze',
      value: 'option',
      title: 'Sequence Option'
    }
  ],
  gaps: [
    {
      icon:  'space_bar',
      value: 'gap',
      title: 'Gap'
    }
  ]
}

const InsertControls = (props) => {
  const types = INSERT_TYPES[props.questionType];

  if (!types) return null;

  return (
    <div className="editor-control-group">
      <span className="group-title">Insert</span>
      {types.map(type =>
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
