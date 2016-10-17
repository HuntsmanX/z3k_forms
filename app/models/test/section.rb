class Test::Section < ApplicationRecord

  belongs_to :test,      class_name: 'Test',           inverse_of: :sections
  has_many   :questions, class_name: 'Test::Question', inverse_of: :section, dependent: :destroy

  validates :title, presence: true
  validates :time_limit, :required_score, numericality: true

end
