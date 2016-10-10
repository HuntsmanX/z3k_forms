class Response::Section < ApplicationRecord

  belongs_to :response
  has_many   :questions

  validates :time_limit, numericality: true
  
end
