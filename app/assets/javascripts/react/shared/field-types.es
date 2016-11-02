import TextInputBlock       from "./field-types/text-input-block.es/";
import TextAreaBlock        from "./field-types/text-area-block.es/";
import DropdownBlock        from "./field-types/dropdown-block.es/";
import CheckboxesBlock      from "./field-types/checkboxes-block.es/";
import RadioButtonsBlock    from "./field-types/radio-buttons-block.es/";
import SequenceBlock        from "./field-types/sequence-block.es/";
import TextEditorBlock      from "./field-types/text-editor-block.es/";
import InlineTextInputBlock from "./field-types/inline-text-input-block.es/";
import InlineDropdownBlock  from "./field-types/inline-dropdown-block.es/";

const FIELD_TYPES = [
  {
    name:               'text_input',
    label:              'Text Input',
    component:          TextInputBlock,
    icon:               'short_text',
    tooltip:            "Text input field for short answers",
    type:               'block',
    hasOptions:         false,
    hasCorrectOptions:  false
  }, {
    name:               'text_area',
    label:              'Text Area',
    component:          TextAreaBlock,
    icon:               'subject',
    tooltip:            "Text area for longer answers",
    type:               'block',
    hasOptions:         false,
    hasCorrectOptions:  false
  }, {
    name:               'dropdown',
    label:              'Dropdown',
    component:          DropdownBlock,
    icon:               'arrow_drop_down_circle',
    tooltip:            "Regular dropdown for single-choice questions",
    type:               'block',
    hasOptions:         true,
    hasCorrectOptions:  true
  }, {
    name:               'checkboxes',
    label:              'Checkboxes',
    component:          CheckboxesBlock,
    icon:               'check_box',
    tooltip:            "Allows selecting multiple options",
    type:               'block',
    hasOptions:         true,
    hasCorrectOptions:  true
  }, {
    name:               'radio_buttons',
    label:              'Radio Buttons',
    component:          RadioButtonsBlock,
    icon:               'radio_button_checked',
    tooltip:            "Regular radio buttons for single-choice questions",
    type:               'block',
    hasOptions:         true,
    hasCorrectOptions:  true
  }, {
    name:               'sequence',
    label:              'Sequence',
    component:          SequenceBlock,
    icon:               'sort',
    tooltip:            "A list of sortable options, for 'reorder' kind of questions",
    type:               'block',
    hasOptions:         true,
    hasCorrectOptions:  false
  }, {
    name:               'text_editor',
    label:              'Text Editor',
    component:          TextEditorBlock,
    icon:               'format_color_text',
    tooltip:            "A rich text editor for large answers, allows using styles etc.",
    type:               'block',
    hasOptions:         false,
    hasCorrectOptions:  false
  }, {
    name:               'inline_text_input',
    label:              'Inline Text Input',
    component:          InlineTextInputBlock,
    icon:               'space_bar',
    tooltip:            "Text input for 'gaps' kind of questions",
    type:               'inline',
    hasOptions:         false,
    hasCorrectOptions:  false
  }, {
    name:               'inline_dropdown',
    label:              'Inline Dropdown',
    component:          InlineDropdownBlock,
    icon:               'arrow_drop_down',
    tooltip:            "Dropdown for 'gaps' kind of questions",
    type:               'inline',
    hasOptions:         true,
    hasCorrectOptions:  true
  }
];

export { FIELD_TYPES };
