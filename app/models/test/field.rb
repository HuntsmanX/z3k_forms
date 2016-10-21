class Test::Field < ApplicationRecord

  belongs_to :question, class_name: 'Test::Question', inverse_of: :fields
  has_many   :options,  class_name: 'Test::Option',   inverse_of: :field,  dependent: :destroy

  enum field_type: [
    :text_input,
    :text_area,
    :dropdown,
    :checkboxes,
    :radio_buttons,
    :sequence,
    :text_editor
  ]

  accepts_nested_attributes_for :options, allow_destroy: true

  validate :content_presence
  validate :options_presence
  validate :options_content_presence
  validate :options_correctness

  def content_presence
    return unless has_content? && autocheck && content.blank?
    errors.add :corrent_answer, "can't be blank as autocheck is enabled"
  end

  def options_presence
    return unless has_options? && options.reject(&:marked_for_destruction?).length < 2
    errors.add :at_least_two_options, "must be present"
  end

  def options_content_presence
    return unless has_options? && options.reject(&:marked_for_destruction?).map(&:content).any?(&:blank?)
    errors.add :all_options, "must have value"
  end

  def options_correctness
    return unless has_options? && autocheck

    correct_options = options.reject(&:marked_for_destruction?).select(&:is_correct)
    error           = "must be marked as correct as autocheck is enabled"

    errors.add :one_option,          error if (dropdown? || radio_buttons?) && correct_options.length != 1
    errors.add :at_least_one_option, error if checkboxes?                   && correct_options.length  < 1
  end

  private

  def has_content?
    text_input? || text_area?
  end

  def has_options?
    dropdown? || checkboxes? || radio_buttons? || sequence?
  end

end
