class Response < ApplicationRecord

  has_many   :sections,  class_name: 'Response::Section'
  belongs_to :testee

  validates :name, presence: true

end
