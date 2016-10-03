import StyleButton from "./style-button.es";

const QUESTION_TYPES = [
  { icon: 'short_text',           value: 'short_answer',    title: 'Short Answer' },
  { icon: 'reorder',              value: 'paragraph',       title: 'Paragraph' },
  { icon: 'radio_button_checked', value: 'single_choice',   title: 'Single Choice' },
  { icon: 'check_box',            value: 'multiple_choice', title: 'Multiple Choice' },
  { icon: 'sort',                 value: 'sequence',        title: 'Sequence' },
  { icon: 'space_bar',            value: 'gaps',            title: 'Gaps' }
]

const QuestionTypeControls = (props) => {
  return (
    <div className="editor-control-group">
      <span className="group-title">Question Type</span>
      {QUESTION_TYPES.map(type =>
        <StyleButton
          key={type.icon}
          active={type.value === props.questionType}
          icon={type.icon}
          iconTitle={type.title}
          onToggle={props.onToggle}
          value={type.value}
        />
      )}
    </div>
  );
}

export default QuestionTypeControls;
