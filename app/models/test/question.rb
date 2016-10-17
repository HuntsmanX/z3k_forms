class Test::Question < ApplicationRecord

  belongs_to :section, class_name: 'Test::Section', inverse_of: :questions
  has_many   :fields,  class_name: 'Test::Field',   inverse_of: :question,  dependent: :destroy

  accepts_nested_attributes_for :fields, allow_destroy: true

end
