class Testee < ApplicationRecord
  enum source_type: [:staff, :recrutment, :new]

  has_many: responses
end
