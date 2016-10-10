class Response < ApplicationRecord
  has_many   :sections, class_name: 'Response::Section'
  has_many   :questions, class_name: 'Response::Question', through: :sections, class_name: 'Response::Section'
  belongs_to :testee

  validates_presence_of   :name
  validates_uniqueness_of :name
end
