class Test::Section < ApplicationRecord
  belongs_to :test
  has_many   :questions

  validates :title, presence: true
  validates :time_limit, :required_score, numericality: true

end
