class Testee < ApplicationRecord

  has_many :responses
  validates :email, uniqueness: true

  enum source_type: [:staff, :recrutment, :local]

end
