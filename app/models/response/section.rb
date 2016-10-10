class Response::Section < ApplicationRecord
  belongs_to :response
  has_many   :questions

  validates :time_for_test, numericality: true
end
