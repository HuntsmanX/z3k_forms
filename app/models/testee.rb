class Testee < ApplicationRecord

  has_many :responses

  enum source_type: [:staff, :recrutment, :local]

end
