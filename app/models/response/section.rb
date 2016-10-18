class Response::Section < ApplicationRecord

  belongs_to :response,  inverse_of: :sections
  has_many   :questions, inverse_of: :section, dependent: :destroy

  validates :time_limit, numericality: true
  
end
