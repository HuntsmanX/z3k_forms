class Question < ApplicationRecord
  belongs_to :test
  enum question_type: [ :short_answer, :paragraph, :single_choice, :multiple_choice, :empty_spaces, :sequence]
end
