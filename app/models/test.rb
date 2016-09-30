class Test < ApplicationRecord
  has_many :sections
  has_many :questions, through: :sections

  validates_presence_of :name
  validates_uniqueness_of :name
end
