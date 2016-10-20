class Response::Section < ApplicationRecord

  belongs_to :response
  has_many   :questions

  enum score_units: [:points, :percent]

  validates :time_limit, numericality: true

end
