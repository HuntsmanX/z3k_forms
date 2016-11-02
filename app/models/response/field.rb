class Response::Field < ApplicationRecord
	belongs_to :question, class_name: 'Response::Question', inverse_of: :fields
	has_many   :options,  class_name: 'Response::Option',   inverse_of: :field,  dependent: :destroy

	enum field_type: [
		:text_input,
		:text_area,
		:dropdown,
		:checkboxes,
		:radio_buttons,
		:sequence,
		:text_editor,
    :inline_text_input,
    :inline_dropdown
	]

	accepts_nested_attributes_for :options, allow_destroy: true
end
