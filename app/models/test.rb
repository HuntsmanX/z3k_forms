class Test < ApplicationRecord
  has_many :questions

  validates_presence_of :name
  validates_uniqueness_of :name
end
