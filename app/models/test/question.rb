class Test::Question < ApplicationRecord

  belongs_to :section
  has_many   :options
  accepts_nested_attributes_for :options

  enum question_type: [:short_answer, :paragraph, :single_choice, :multiple_choice, :empty_spaces, :sequence]

  validates_presence_of :content
  
end
