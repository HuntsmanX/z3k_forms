class Test::Question < ApplicationRecord

  belongs_to :section, class_name: 'Test::Section', inverse_of: :questions
  has_many   :fields,  class_name: 'Test::Field',   inverse_of: :question,  dependent: :destroy

  accepts_nested_attributes_for :fields, allow_destroy: true

  validate :fields_count
  validate :fields_validity

  default_scope -> { order(:order_index) }

  def fields_count
    return unless fields.reject(&:marked_for_destruction?).count < 1
    errors.add :question, "must contain at least one field"
  end

  def fields_validity
    fields.reject(&:marked_for_destruction?).each do |field|
      errors.add :fields, { block_key: field.block_key, errors: field.errors.messages } unless field.valid?
    end
    errors.keys.select { |k| k =~ /^fields\./ }.map { |k| errors.delete(k) }
  end

end
